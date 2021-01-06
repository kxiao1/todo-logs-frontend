import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './App.css';

function App() {
  const [chosenDate, setChosenDate] = useState(new Date());

  const onDateChange = (date) => {
    // TODO
    setChosenDate(date);
    console.log("date change");
  };
  const onClickOutside = () => {
    // console.log("clicked outside"); // might need something more substantive?
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="logs">
        <DatePicker selected={chosenDate} onChange={onDateChange} onClickOutside={onClickOutside} />
      </div>
    </div>
  );
}

export default App;
