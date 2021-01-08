import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Switch, Button, Space, Table, Modal } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { serverAdd } from "./constants.js";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [todo, setTodo] = useState(null);
  const offset = chosenDate.getTimezoneOffset();
  const dateObject = new Date(chosenDate.getTime() - offset * 60 * 1000);
  const correctDate = dateObject.toISOString().split("T")[0];

  const onDateChange = (date) => {
    // TODO
    setChosenDate(date);
  };

  const sendUpdateRequest = (type, item) => {
    let params = "";
    const { key, id, ...data } = item;
    if (type !== "POST") {
      params = id + "/";
    }
    const urlWithParams = serverAdd + params;
    fetch(urlWithParams, {
      method: type,
      headers: {
        "Content-Type": "application/JSON",
      },
      body: data ? JSON.stringify(data) : null,
    })
      .then(sendGetRequest)
      .catch((err) => console.log(err));
  };

  const sendGetRequest = () => {
    const urlWithParams =
      serverAdd + "?" + new URLSearchParams({ date: correctDate });
    // console.log(urlWithParams);
    fetch(urlWithParams, {
      headers: {
        "Content-Type": "application/JSON",
      },
    })
      .then((res) => res.json())
      .then((res) => makeList(res))
      .catch((err) => console.log(err));

    // for development
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
  const showModal = (record) => {
    inputID.current = record.id || -1;
    setVisible(true);
    setActive(record);
  };

  const markAsComplete = (record) => {
    // console.assert(!record.completed);
    record.completed = true;
    sendUpdateRequest("PUT", record);
  };

  const deleteItem = (record) => {
    sendUpdateRequest("DELETE", record);
  };

  const makeList = (res) => {
    const listWithKey = res.map(({ id: value, ...rest }) => ({
      key: value,
      id: value,
      ...rest,
    }));
    setTodo(<Table dataSource={listWithKey} columns={columns} />);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date_added",
      key: "date_added",
    },
    {
      title: "Completed?",
      dataIndex: "completed",
      key: "completed",
      render: (text) =>
        text ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />,
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
  const placeholder = <p id="placeholder">Loading...</p>;
  if (todo == null) {
    sendGetRequest();
  }
  return (
    <div className="App">
      {todo ? <div className="wrap">
        <div className="logs">
          <div className="switch">
            <Switch checkedChildren="Weekly" unCheckedChildren="Daily" />
          </div>
          <div className="close">
            <DatePicker
              id="datepicker"
              selected={chosenDate}
              onChange={onDateChange}
            />
            <Button onClick={sendGetRequest}>Select</Button>
          </div>
          {todo}
          <div className="new">
            <Button type="primary" onClick={() => showModal(dummyRecord)}>
              New Task
            </Button>
          </div>
        </div>
        <Modal visible={visible} onOk={handleSubmit} onCancel={handleCancel}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="title" className="required">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={activeRecord.title}
              ref={inputTitle}
              placeholder="Enter Todo Title"
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
      </div> : placeholder}
    </div>
  );
}

export default App;
