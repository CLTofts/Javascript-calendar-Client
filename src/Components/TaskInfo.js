import React, { Component } from 'react'

export class TaskInfo extends Component {
  render() {
    return (
      <div>
        <h1><u>{this.props.info.taskName}</u></h1>
        <h2>Priority: {this.props.info.priority}</h2>
        <h2>Description</h2>
        <p>{this.props.info.description}</p>
        <button className="taskButton delete" style={{fontSize: '30px'}} onClick={this.props.handleDelete.bind(this, this.props.info.id)}>Delete Task</button>
      </div>
    )
  }
}

export default TaskInfo
