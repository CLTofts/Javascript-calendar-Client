import React, { Component } from "react";
import "./Css/CalenderBase.css";
import CalenderItem from "./CalenderItem";
import FormComponent from "./FormComponent";
import TaskInfo from "./TaskInfo";
import UpdateInfo from "./UpdateInfo";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export class CalenderBase extends Component {
  constructor(props) {
    super(props);
    this.updateChange = this.updateChange.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  state = {
    form: {
      taskName: "",
      month: this.props.month.monthName,
      startTime: "",
      endTime: "",
      day: 1,
      priority: "Normal",
      description: "",
    },
    hidden: {
      formHidden: true,
      taskInfoHidden: true,
      updateInfoHidden: true,
    },
    info: {
      id: "",
      taskName: "",
      month: "",
      day: 1,
      priority: "",
      description: "",
    },
  };

  updateChange = (name, value) => {
    var newState = this.state;
    switch (name) {
      case "month":
        newState.form.month = value;
        break;
      case "taskName":
        newState.form.taskName = value;
        break;
      case "day":
        newState.form.day = parseInt(value);
        break;
      case "priority":
        newState.form.priority = value;
        break;
      case "description":
        console.log("Updating description");
        newState.form.description = value;
        break;
      case "startTime":
        newState.form.startTime = value;
        console.log("Start Time: " + value);
        break;
      case "endTime":
        newState.form.endTime = value;
        console.log("End Time: " + value);
        break;
      default:
        console.log("Error with switch case, got" + value);
        break;
    }
    this.setState({ newState });
  };

  addTask = () => {
    this.props.addTask(this.state.form);
   // this.resetForm();
    this.toggleOff();
  };

  resetForm = () => {
    var newState = this.state;
    newState.form.taskName = "";
    newState.form.startTime = "";
    newState.form.endTime = "";
    newState.form.day = 1;
    newState.form.priority = "Normal";
    newState.form.description = "";
    this.setState({newState});
  }

  //Shows form after button is pressed
  toggleForm = () => {
    var newState = this.state;

    newState.hidden.formHidden = !newState.hidden.formHidden;
    newState.hidden.taskInfoHidden = true;
    newState.hidden.updateInfoHidden = true;
    this.setState({ newState });
  };

  toggleInfo = (id, name, day, priority, description) => {
    console.log("Info:" + id + ", "  + name + ", "  + day + ", "  + priority + ", "  + description + ", ");
    var newState = this.state;
    newState.info.id = id;
    newState.info.taskName = name;
    newState.info.day = day;
    newState.info.priority = priority;
    newState.info.description = description;
    newState.hidden.formHidden = true;
    newState.hidden.updateInfoHidden = true;
    newState.hidden.taskInfoHidden = false;
    this.setState({ newState });
  };

  toggleOff = () => {
    var newState = this.state;
    newState.hidden.formHidden = true;
    newState.hidden.taskInfoHidden = true;
    newState.hidden.updateInfoHidden = true;
    this.setState(newState);
  };

  //Gets the tasks for a certain day
  getDayTasks = (id) => {
    var dayTasks = [];
    for (var i = 0; i < this.props.month.tasks.length; i++) {
      if (this.props.month.tasks[i].day !== "") {
        if (parseInt(id) === this.props.month.tasks[i].day) {
          dayTasks.push(this.props.month.tasks[i]);
        }
      }
    }
    return dayTasks;
  };

  //Removes days from list that arent part of that month
  removeEmptyDays = (days) => {
    var newArray = [];
    for (var i = 0; i < days.length; i++) {
      if (days[i] !== "") {
        newArray.push(days[i]);
      }
    }
    return newArray;
  };

  //Creates calender month depending on which month and year it is
  createTableRows = () => {
    var today = new Date();
    var rows = [];
    for (var i = 0; i < 6; i++) {
      var days = [];

      for (var j = 0; j < 7; j++) {
        var day = i * 7 + j;
        var name = "calenderItem";
        if (day === 0 || day % 7 === 0) {
          name = name + " left";
        }
        if (day > 34) {
          name = name + " bot";
        }

        if (
          today.getMonth() === this.props.month.id - 1 &&
          today.getDate() === parseInt(this.props.month.days[day])
        ) {
          days.push(
            <div
              className={name}
              style={{ backgroundColor: "lightblue" }}
              data-date={this.props.month.days[day]}
            >
              <CalenderItem
                tasks={this.getDayTasks(this.props.month.days[day])}
                handleClick={this.toggleInfo}
              />
            </div>
          );
        } else {
          days.push(
            <div className={name} data-date={this.props.month.days[day]}>
              <CalenderItem
                tasks={this.getDayTasks(this.props.month.days[day])}
                handleClick={this.toggleInfo}
              />
            </div>
          );
        }
      }
      rows.push(<div className="Rows rowBottom">{days}</div>);
    }
    return rows;
  };

  // taskUpdate = () => {
  //   var newState = this.state;
  //   newState.form.taskName = newState.info.taskName;
  //   newState.form.day = newState.info.day;
  //   newState.form.priority = newState.info.priority;
  //   newState.form.description = newState.info.description;
  //   console.log(
  //     newState.form.taskName +
  //       ", " +
  //       newState.form.day +
  //       ", " +
  //       newState.form.priority +
  //       ", " +
  //       newState.form.description
  //   );
  //   newState.hidden.formHidden = true;
  //   newState.hidden.taskInfoHidden = true;
  //   newState.hidden.updateInfoHidden = false;
  //   this.setState({ newState });
  // };

  taskDelete = (id) => {
    this.props.taskDelete(id);
    this.toggleOff();
  };

  updateSubmit = () => {
    this.props.updateTask(this.state.info.id, this.state.form);
    this.toggleOff();
  };

  render() {
    return (
      <div className="calenderContainer">
        <div className="calender">
          <div className="CalenderHeader">
            <Link
              to="/"
              className="HeaderItem"
              onClick={this.props.changeMonth.bind(
                this,
                this.props.month.id,
                "back"
              )}
              style={{
                paddingTop: "25px",
                textDecoration: "none",
                fontSize: "30px",
              }}
            >
              {"<"}
            </Link>

            <div className="HeaderItem" style={{ textAlign: "center" }}>
              <h1 className="HeaderItem">{this.props.month.monthName}</h1>
              <h3>{new Date().getFullYear()}</h3>
            </div>

            <Link
              to="/"
              className="HeaderItem"
              onClick={this.props.changeMonth.bind(
                this,
                this.props.month.id,
                "next"
              )}
              style={{
                paddingTop: "25px",
                textDecoration: "none",
                fontSize: "30px",
              }}
            >
              {">"}
            </Link>
          </div>
          <div className="calenderBottom">
            <div className="Table">
              <div className="Rows">
                <div className="rowHeader left">Sunday</div>
                <div className="rowHeader">Monday</div>
                <div className="rowHeader">Tuesday</div>
                <div className="rowHeader">Wednesday</div>
                <div className="rowHeader">Thursday</div>
                <div className="rowHeader">Friday</div>
                <div className="rowHeader">Saturday</div>
              </div>

              {this.createTableRows()}
            </div>
          </div>
        </div>
        <div className="addingItem">
          <div className="addingTop">
            <Button
              style={{ height: '100%', width: "inherit", fontSize: "20px" }}
              onClick={this.toggleForm}
            >
              Add Event
            </Button>
          </div>

          <div className="addingBot">
            <div className="formTab">
              {!this.state.hidden.formHidden && (
                <FormComponent
                  monthName={this.props.month.monthName}
                  months={this.props.months}
                  days={this.removeEmptyDays(this.props.month.days)}
                  form={this.state.form}
                  onFormChange={this.updateChange}
                  onFormSubmit={this.addTask}
                />
              )}
            </div>
            <div className="InfoTab">
              {!this.state.hidden.taskInfoHidden && (
                <TaskInfo
                  info={this.state.info}
                  handleDelete={this.taskDelete}
                />
              )}
            </div>
            <div className="UpdateTab">
              {!this.state.hidden.updateInfoHidden && (
                <UpdateInfo
                  monthName={this.props.month.monthName}
                  months={this.props.months}
                  days={this.removeEmptyDays(this.props.month.days)}
                  id={this.state.info.id}
                  info={this.state.form}
                  onFormChange={this.updateChange}
                  onUpdateSubmit={this.updateSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalenderBase;
