import React, { Component } from "react";
import "./Css/FormComponent.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    timeFormVisible: false,
  };
  handleChange = (event) => {
    this.props.onFormChange(event.target.name, event.target.value);
  };

  handleSubmit = (event) => {
    this.props.onFormSubmit();
    event.preventDefault();
  };

  toggleTimeVisible = () => {
    var newState = this.state;
    if (this.state.timeFormVisible === true) {
      newState.timeFormVisible = false;
    } else {
      newState.timeFormVisible = true;
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="formContainer" onSubmit={this.handleSubmit}>
        <form>
          <p></p>
          {
            <label style={{ fontSize: "20px" }}>
              Month:
              <select
                name="month"
                value={this.props.form.month}
                style={{ fontSize: "20px" }}
                onChange={this.handleChange}
              >
                {this.props.months().map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
            </label>
          }
          <label>
            Event Name:
            <input
              name="taskName"
              value={this.props.form.taskName}
              maxLength={30}
              type="text"
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Include Time     
            <input type="checkbox" onChange={this.toggleTimeVisible}></input>
          </label>
          {this.state.timeFormVisible && (
            <label>
              Start time:
              <input
                name="startTime"
                type="time"
                onChange={this.handleChange}
              ></input>
            </label>
          )}
          {this.state.timeFormVisible && (
            <label>
              End time:
              <input
                name="endTime"
                type="time"
                onChange={this.handleChange}
              ></input>
            </label>
          )}
          <label style={{ fontSize: "20px" }}>
            Date:
            <select
              name="day"
              value={this.props.form.day}
              style={{ fontSize: "20px" }}
              onChange={this.handleChange}
            >
              {this.props.days.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={this.props.form.priority}
              style={{ fontSize: "20px" }}
              onChange={this.handleChange}
            >
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Description:
            <textarea name="description" onChange={this.handleChange} />
          </label>
          <label>
            <input
              style={{width: "100px", textAlign: "center", fontSize: "20px" }}
              type="Submit"
            ></input>
          </label>
        </form>
      </div>
    );
  }
}

export default FormComponent;
