import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TestHoc from "./components/TestHoc";
import Routes from "./Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Routes />
        <TestHoc />
      </header>
    </div>
  );
}

export default App;
