import React, { Component } from 'react'
import './Css/CalenderItem.css'

export class CalenderItem extends Component {

  
getColour = (priority) => {
  switch (priority){
    case "High":
      return "red"
    case "Normal":
      return "grey"
    default:
      return "blue"
  }
}


  getStyle = (priority) => {
    return{
      flex: '1 0 0',
      width: '100%',
      borderRadius: '5px',
      backgroundColor: this.getColour(priority),
      fontSize: '17px',
      cursor: 'pointer'

    }
  }
    
  render() {
    return (
        <div className="taskContainer">
        {this.props.tasks.map((task) => (
          <div className="gaps">
            <button style={this.getStyle(task.priority)} onClick={this.props.handleClick.bind(this, task.id, task.name, task.day, task.priority, task.description)}>{task.name}</button>
          </div>
          
        ))}
        </div>

      
      
      
    )
  }
}

export default CalenderItem
