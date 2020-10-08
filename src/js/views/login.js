import React from "react";

export const Login = () => {
	return (
		<div className="container">
			<h1>Login View</h1>
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
				<button className="form-group btn btn-primary" type="submit">
					Sign in
				</button>
				{/* https://bootsnipp.com/snippets/X04B0 */}
				<div className="form-group">
					{/*<button className="btn btn-link form-control" type="submit">
						New around here? Sign up
					</button>
					<button className="btn btn-link" type="submit">
						Forgot password?
					</button>*/}
					<p>
						<a href="#">New around here? Sign up</a>
					</p>
					<p>
						<a href="#">Forgot password?</a>
					</p>
				</div>
			</form>
		</div>
	);
};
