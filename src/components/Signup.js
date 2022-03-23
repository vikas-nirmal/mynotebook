import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:""})

    let history = useHistory();

    const handleSubmit = async (e)=>{
         e.preventDefault();
         const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          if (json.success){
              //save the token and redirect
              localStorage.setItem('token', json.authtoken);    
              history.push('/')
              props.showAlert("Account Created Successfully", "success")
          }
          else{
              props.showAlert("Invalid Details", "danger")
          }
    }

    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
    )
}

export default Signup
