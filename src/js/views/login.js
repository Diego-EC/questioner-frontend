import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ButtonPrimary } from "../component/bootstrap/button-primary";

export const Login = () => {
	function goToMainView() {
		history.push("/questions");
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
					{/* TODO: este botón enviará el formulario a la API
                    <button type="submit" className="btn btn-primary">
						Sign in
                    </button>*/}
					<Link to="/questions">
						<ButtonPrimary label={"Sign in"} />
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
