import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./Css/Login.css";


export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    var data = {
      email: email,
      password: password
    }

    console.log(data);
    fetch("https://calender-server.herokuapp.com/users/getLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((responce) => responce.json())
    .then((result) => {
      console.log("Length: " + result.recordset.length);
      if(result.recordset.length !== 0){
        alert("Logged in");
        console.log(email)
        history.push('/calender/' + email);
      }
      else{
        alert("Incorrect Login");
      }
    })
    .catch(function(err){
      console.log("ERR: " + err);
      alert("Failed to Login");
    })
      
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>Password</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}