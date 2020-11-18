import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes";

import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login"
import Header from "./Components/Layout/Header";
import CalenderBase from "./Components/CalenderBase";
const axios = require("axios");


class App extends Component {
  

  render() {
    return (

      <Routes />
    );
  }
}

export default App;
