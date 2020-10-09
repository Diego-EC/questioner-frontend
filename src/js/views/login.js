import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Login = () => {
	function goToMainView() {
		//console.log("LOL");
		history.push("/main");
	}

	return (
		<div className="container">
			<h1 className="text-center">Login View</h1>
			<form action="">
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter password"
						name="password"
					/>
				</div>
				<div className="form-group form-check">
					<input type="checkbox" className="form-check-input" id="check" />
					<label className="form-check-label" htmlFor="check">
						Remember me
					</label>
				</div>
				<div className="form-group">
					{/*<button type="submit" className="btn btn-primary">
						Sign in
                    </button>*/}
					<Link to="/main" className="btn btn-primary">
						Sign in
					</Link>
				</div>
				<div className="form-group">
					<p>
						<Link to={"/create-user"}>New around here? Sign up</Link>
					</p>
					<p>
						<Link to={"/forgot-password"}>Forgot password?</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
