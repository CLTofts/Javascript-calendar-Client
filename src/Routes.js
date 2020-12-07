import React from "react";
import { Route, Switch } from "react-router-dom";
import Calender from "./Components/Calender";
import Login from "./Components/Login.js"
import Header from "./Components/Layout/Header.js"

export default function Routes() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/calender/:emailName">
          <Calender />
        </Route>
        <Route exact path="/login">
          <Login />
      </Route>
      </Switch>
    </div>
  );
}