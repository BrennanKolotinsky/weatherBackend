import React, { Component } from "react";
const axios = require('axios');

class Authentication extends React.Component {

	constructor(props) {
    	super(props);

    	this.state = {
    		username: '',
    		password: '',
    	};
    }

    updateUserName(e) {
		this.state.username = e.target.value;
	}

	updatePassword(e) {
		this.state.password = e.target.value;
	}

	checkAuth() {
		if (this.state.username === '' || this.state.password === '')
			alert("Incomplete login info!");

		// axios(
		// 	{
		// 	  method: "POST", 
		// 	  url: process.env.port === 8080 ? "http://localhost:3001/authenticate" : "http://localhost:8081/authenticate",
		// 	  crossDomain: true, 
		// 	  data: {
		// 	  	username: this.state.username,
		// 	  	password: this.state.password,
		// 	  }
		// 	}).then((response) => {

		// 		if (response.data.auth === 1) {
		// 			alert("Authenticated!");
		// 			// this.props.confirmAuth()
		// 			this.props.forceUpdate(1);
		// 		} else {
		// 			alert("Invalid username or password!");
		// 		}
		// 	}
		// );
	}

    render() {

		return (
			<div className="marginAddedTop">
				<input className="block inputs" type="text" placeholder="username" onChange= { (event) => this.updateUserName(event) }></input>
				<input className="block marginAddedLeft inputs" type="text" placeholder="password" onChange= { (event) => this.updatePassword(event) }></input>
				<button className="inputs confirmBtn" onClick={ () => this.checkAuth() }>Login</button>
			</div>
		);
	}

}

export default Authentication;