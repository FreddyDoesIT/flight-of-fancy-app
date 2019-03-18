import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let email = e.target.email.value.trim();
		let pwd = e.target.password.value.trim();

		Meteor.loginWithPassword(
			{ email: email }, pwd,
			err => {
				if (err) {
					this.setState({
						error: "Login Failed. Please check email and password."
					});
				} else {
					this.setState({
						error: ""
					});
				}
			}
		);
	}

	render() {
		return (
			<div>
				<h1>Login here</h1>

				{this.state.error ? <p>{this.state.error}</p> : undefined}

				<form onSubmit={this.onSubmit.bind(this)} noValidate>
					<input type="email" name="email" placeholder="Email" />
					<input
						type="password"
						name="password"
						placeholder="Password"
					/>
					<button>Login</button>
				</form>

				<Link to="/signup">signup</Link>
			</div>
		);
	}
}
