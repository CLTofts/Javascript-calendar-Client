import React, { Component } from 'react'
import './Css/FormComponent.css'

export class UpdateInfo extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.props.onFormChange(event.target.name, event.target.value);
    }

    handleSubmit = (event) => {
        this.props.onUpdateSubmit();
        event.preventDefault();
    }

    
  render() {
    return (
        
      <div className='formContainer' onSubmit={this.handleSubmit}>
        <form>
            <h3>Month: {this.props.monthName}</h3>
            <label>
                Task Name:
                <input name="taskName" value={this.props.info.taskName} maxLength={30} type="text" onChange={this.handleChange}></input>
            </label>
            
            <label style={{fontSize: '20px'}}>
                Day:
                <select name="day" value={this.props.info.day} style={{fontSize: '20px'}} onChange={this.handleChange}>
                    {this.props.days.map((day) => (
                        <option value={day}>{day}</option>
                    ))}
                </select>
            </label>
            <label>
            Priority:
                <select name='priority' value={this.props.info.priority} style={{fontSize: '20px'}} onChange={this.handleChange}>
                    <option value='Normal'>Normal</option>
                    <option value='Low'>Low</option>
                    <option value='High'>High</option>
                </select>
            </label>
            <label>
                Description:
                <textarea name='description' value={this.props.info.description} onChange={this.handleChange}/>
            </label>
            <label>
             <input style={{width:'100px', textAlign:'center', fontSize: '20px'}} type='submit' value="Update"></input>
            </label>
            
        </form>
      </div>
    )
  }
}

export default UpdateInfo
