import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Switch, Button, Space, Table, Modal } from "antd";
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { serverAdd, authAdd, modes, user } from "./constants.js";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const milliSecondsInDay = 86400 * 1000;

// converts date string into iso format (YYYY-DD-MM)
const getCorrectDate = (currDate) => {
  const d = new Date(currDate);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

// clear localStorage when tab is closed
window.onbeforeunload = () => {
  localStorage.removeItem("token");
};

function App() {
  // authentication
  const [isLoggedIn, setLoggedIn] = useState(false);
  if (!isLoggedIn) {
    fetch(authAdd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Check credentials (i.e. constants.js).");
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("token", res.access);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err.name, "\n", err.message));
  }

  // Dates and Modes
  const [chosenDate, setChosenDate] = useState(new Date());
  const mode = useRef(modes.daily);
  const correctDate = getCorrectDate(chosenDate.getTime());
  const rangeText =
    mode.current === modes.weekly
      ? "*" +
        getCorrectDate(
          chosenDate - ((chosenDate.getDay() + 6) % 7) * milliSecondsInDay
        ) +
        " to " +
        getCorrectDate(
          chosenDate - ((chosenDate.getDay() - 7) % 7) * milliSecondsInDay
        )
      : "";
  const dateRange =
    rangeText.length > 0 ? <span id="dateRange">{rangeText}</span> : null;
  const [todo, setTodo] = useState(null);
  const onDateChange = (date) => {
    setChosenDate(date);
    setTodo(null);
  };
  const setToday = () => {
    setChosenDate(new Date());
    setTodo(null);
  };
  const onModeChange = () => {
    mode.current = mode.current === modes.daily ? modes.weekly : modes.daily;
    sendGetRequest();
  };

  // All non-GET API Requests
  const sendUpdateRequest = (type, item) => {
    let params = "";
    const { key, id, isFirst, ...data } = item;
    if (type !== "POST") {
      params = id + "/";
    }
    const urlWithParams = serverAdd + params;
    fetch(urlWithParams, {
      method: type,
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: data ? JSON.stringify(data) : null,
    })
      .then(sendGetRequest)
      .catch((err) => console.log(err));
  };

  const sendGetRequest = () => {
    const urlWithParams =
      serverAdd +
      "?" +
      new URLSearchParams({ date: correctDate, mode: mode.current });
    fetch(urlWithParams, {
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Check credentials and try refreshing.");
        }
        return res.json();
      })
      .then((res) => makeList(res))
      .catch(alert);

    // sample data for development/ debugging
    // const today = new Date().toLocaleDateString("en-us");
    // const fakeData = JSON.stringify([
    //   {
    //     id: 1,
    //     title: "French",
    //     description: "lessons 33 and 34",
    //     dateAdded: today,
    //     completed: false,
    //   },
    // ]);
    // makeList(fakeData);
  };

  // form is uncontrolled (uses Refs)
  const dummyRecord = {
    title: "",
    description: "",
    date_added: correctDate,
    completed: false,
    id: -1,
  };
  const [visible, setVisible] = useState(false);
  const [activeRecord, setActive] = useState(dummyRecord);
  const formRef = useRef(null);
  const inputTitle = useRef(null);
  const inputDescription = useRef(null);
  const inputDate = useRef(null);
  const inputCompleted = useRef(null);
  const inputID = useRef(0);

  const handleSubmit = () => {
    const newRecord = {
      title: inputTitle.current.value,
      description: inputDescription.current.value,
      date_added: inputDate.current.value,
      completed: inputCompleted.current.checked,
    };
    if (inputID.current === -1) {
      // new entry: no 'id' field, use POST
      sendUpdateRequest("POST", newRecord);
    } else {
      newRecord.id = inputID.current;
      sendUpdateRequest("PUT", newRecord);
    }
    formRef.current.reset();
    setVisible(false);
  };
  const handleCancel = () => {
    formRef.current.reset();
    setVisible(false);
  };

  // Edit, Complete, and Delete
  const showModal = (record) => {
    inputID.current = record.id || -1;
    setVisible(true);
    setActive(record);
  };

  const markAsComplete = (record) => {
    record.completed = true;
    sendUpdateRequest("PUT", record);
  };

  const deleteItem = (record) => {
    sendUpdateRequest("DELETE", record);
  };

  // Make table out of returned contents
  const makeList = (res) => {
    const listWithKey = res.map(({ id: value, ...rest }) => ({
      key: value,
      id: value,
      ...rest,
    }));
    const compareFn = (a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    };
    listWithKey.sort(compareFn);
    const listGrouped = listWithKey.map((value, idx) => ({
      ...value,
      isFirst: idx === 0 || value.title !== listWithKey[idx - 1].title,
    }));

    setTodo(
      <Table
        dataSource={listGrouped}
        columns={columns}
        pagination={{ pageSize: 7 }}
      />
    );
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => record.isFirst && text,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date Added",
      dataIndex: "date_added",
      key: "date_added",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (text) =>
        text ? (
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ fontSize: "16px" }}
          />
        ) : (
          <ExclamationCircleTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "16px" }}
          />
        ),
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button
            disabled={record.completed}
            onClick={() => markAsComplete(record)}
          >
            Complete
          </Button>
          <Button danger onClick={() => deleteItem(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const placeholder = (
    <div id="placeholder">{isLoggedIn ? "" : "Not connected to server."}</div>
  );
  if (isLoggedIn && todo == null) {
    sendGetRequest();
  }
  console.log(mode.current);
  return (
    <div className="App">
      <div className="wrap">
        <h1 id="title">todo-logs</h1>
        {todo && (
          <>
            <div className="switch">
              <Switch
                onClick={onModeChange}
                checkedChildren="Weekly"
                unCheckedChildren="Daily"
                defaultChecked={mode.current === modes.weekly}
              />
              {dateRange}
            </div>
            <div className="close">
              <div className="date">
                <DatePicker
                  id="datepicker"
                  selected={chosenDate}
                  onChange={onDateChange}
                />
                <Button onClick={setToday}>
                  {mode.current === modes.daily ? "Today" : "This Week"}
                </Button>
              </div>
              <Button type="primary" onClick={() => showModal(dummyRecord)}>
                New Task
              </Button>
            </div>
            {todo}
            <Modal
              visible={visible}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >
              <form ref={formRef} onSubmit={handleSubmit}>
                <h2 id="modalTitle">
                  {inputID.current === -1 ? "New Task" : "Edit Task"}
                </h2>
                <label htmlFor="title" className="required">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={activeRecord.title}
                  ref={inputTitle}
                  placeholder="Enter Title"
                  required
                />
                <br></br>
                <label htmlFor="description" className="required">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={activeRecord.description}
                  ref={inputDescription}
                  placeholder="Enter Description"
                />
                <br></br>
                <label htmlFor="date">Date added</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={activeRecord.date_added}
                  ref={inputDate}
                  readOnly
                  id="readonly"
                />
                <br></br>
                <input
                  type="checkbox"
                  name="completed"
                  ref={inputCompleted}
                  defaultChecked={activeRecord.completed}
                />
                <label htmlFor="completed">Completed?</label>
              </form>
            </Modal>
          </>
        )}
      </div>
      {!todo && placeholder}
    </div>
  );
}

export default App;
