import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Layout/Header";
import CalenderBase from "./Components/CalenderBase";
const axios = require("axios");

class App extends Component {
  constructor() {
    super();
    this.state = {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      months: [],
      current: {},
      test: [],
    };
  }

  componentWillMount(){
    this.createCalender();
    this.state.current = this.state.months[new Date().getMonth()];
  }

  componentDidMount() {
    this.grabTasks();
  }
  //Sets up local state calender based on the year and how the calender should be structured.
  createCalender = () => {
    var newState = this.state;
    var year = new Date().getFullYear();
    for(var i = 0; i < 12; i++){

      var dayCount = 1;
      var days = []
      
      var firstDay = new Date(year, i, 1).getDay();
      var lastDay = new Date(year, i+1, 0).getDate();
      for(var j = 0; j < 42; j++){

        if(j >=firstDay && dayCount <= lastDay){ 
          days.push(dayCount.toString());
          dayCount++;
        }
        else{
          days.push("");
        }
      }
      console.log(days);
      newState.months[i] = {
        id: i + 1,
        monthName: this.state.monthNames[i],
        days: days,
        tasks: []
      }
    }
    this.setState({newState});
  }

  //Grabs existing tasks from database and adds them to the local visual list of events while avoiding duplicates fropm showing.
  grabTasks = () => {
    
    fetch("/users")
      .then((responce) => responce.json())
      .then((result) => {
        var newState = this.state;
        var idList = [];
        console.log(result); //What i need to change to to get the right inormation;
        for(var a = 0; a < result.recordset.length; a++) {
          var date = this.separateDate(result.recordset[a].date);
          for (var i = 0; i < this.state.months.length; i++) {
            if (date[1] === this.state.months[i].id) {
              for (var j = 0; j < this.state.months[i].tasks.length; j++) {
                idList.push(this.state.months[i].tasks[j].id);
              }
              if (!idList.includes(result.recordset[a].eventId)) {
                newState.months[i].tasks.push({
                  id: result.recordset[a].eventId,
                  year: date[0],
                  month: date[1],
                  day: date[2],
                  startTime: result.recordset[a].startTime,
                  endTime: result.recordset[a].endTime,
                  name: result.recordset[a].eventName,
                  priority: result.recordset[a].priority,
                  description: result.recordset[a].eventDescription,
                });
              }
            }
          }
        };
        newState.current = this.state.months[new Date().getMonth()];
        this.setState({ newState });
      });
  };

  setCurrentMonth = () => {
    var date = new Date().getMonth();

    for (var i = 0; i < this.state.months.length; i++) {
      if (this.state.months[i].id === date + 1) {
        var newState = this.state;
        newState.current = this.state.months[i];
        this.setState({ newState });
      }
    }
  };

  //removes unneeded part of date and splits up year month and day.
  separateDate = (date) => {
    var date1 = new Date(date);

    var values = [date1.getFullYear(), date1.getMonth() + 1, date1.getDate()];
    return values;
  };

  //Changes the visible month when the directional buttons are pressed
  changeMonth = (current, direction) => {
    for (var index = 0; index < this.state.months.length; index++) {
      if (this.state.months[index].id === Number(current)) {
        var location = this.state.months[index].id;
        var next = null;
        switch (direction) {
          case "next":
            if (location === 12) {
              next = 1;
            } else {
              next = location + 1;
            }
            break;
          case "back":
            if (location === 1) {
              next = 12;
            } else {
              next = location - 1;
            }
            break;

          default:
            break;
        }
        this.setState({
          current: this.state.months[next - 1],
        });
      }
    }
  };

  //Adds task to the database and then regrabs the task
  addTask = (taskInfo) => {

    var data = {
      name: taskInfo.taskName,
      startTime: this.checkTime(taskInfo.startTime),
      endTime: this.checkTime(taskInfo.endTime),
      date: this.combineDate(taskInfo.day, taskInfo.month),
      priority: taskInfo.priority,
      description: taskInfo.description,
    };
    console.log(data);
    if(data.startTime === "NULL"){
      fetch("/users/addTaskWithoutTime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error(response.text);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data === "success") {
        console.log("Item has been added");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
    }

    else{
      fetch("/users/addTaskWithTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error(response.text);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data === "success") {
          console.log("Item has been added");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    
      

    this.grabTasks();

    // var month = this.state.current.id-1;
    // var newState = this.state;
    //     newState.months[month].tasks.push({
    //       id: uuidv4(),
    //       day: parseInt(taskInfo.day),
    //       name: taskInfo.taskName,
    //       priority: taskInfo.priority,
    //       description: taskInfo.description
    //     });

    //     this.setState({newState});
    //     console.log("only Reaching back here");
  };

  //Changes time string to proper formatting for database.
  checkTime = (time) => {
    if (time === "") {
      return "NULL";
    } else {
      return time + ":00";
    }
  };

  //Combines day month and year into date format for database.
  combineDate = (day, month) => {
    var dayString = day.toString();
    if (dayString.length === 1) {
      dayString = "0" + dayString;
    }
    var temp = "2020-" + this.numberMonth(month) + "-" + dayString;
    return temp;
  };

  //Returns month number from month name
  numberMonth = (month) => {
    console.log(month);
    for (var j = 0; j <= this.state.months.length; j++) {
      if (this.state.months[j].monthName === month) {
        var temp = this.state.months[j].id.toString();
        if (temp.length === 1) {
          return "0" + temp;
        } else {
          return temp;
        }
      }
    }
  };

  //Updates current event (Not implemented into database yet).
  updateTask = (id, info) => {
    var month = this.state.current.id - 1;
    var newState = this.state;
    for (var i = 0; i < newState.months[month].tasks.length; i++) {
      if (newState.months[month].tasks[i].id === id) {
        newState.months[month].tasks[i].name = info.taskName;
        newState.months[month].tasks[i].day = info.day;
        newState.months[month].tasks[i].priority = info.priority;
        newState.months[month].tasks[i].description = info.description;
        break;
      }
    }
    this.setState({ newState });
  };

  //Deletes the event from the client side (Doesnt remove from database)
  taskDelete = (id) => {
    var data = {
      id: id
    }
    fetch("/users/deleteTaskById", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error(response.text);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data === "success") {
        console.log("Item has been added");
      }
    })
    .catch(function (err) {
      console.log(err);
    });



    var month = this.state.current.id - 1;
    var newState = this.state;
    for (var i = 0; i < newState.months[month].tasks.length; i++) {
      if (newState.months[month].tasks[i].id === id) {
        newState.months[month].tasks.splice(i, 1);
        break;
      }
    }
    this.setState({ newState });
  };

  getMonths = () => {
    var months = [];
    for (var i = 0; i < this.state.months.length; i++) {
      months.push(this.state.months[i].monthName);
    }
    return months;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <CalenderBase
            id="calender"
            month={this.state.current}
            months={this.getMonths}
            changeMonth={this.changeMonth}
            addTask={this.addTask}
            updateTask={this.updateTask}
            taskDelete={this.taskDelete}
          />
        </div>
      </Router>
    );
  }
}

export default App;
