import React from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
	return (
		<div>
			<h1 className="text-center">Forgot Password</h1>
			<form action="">
				<div className="row justify-content-center">
					<div className="col" align="center">
						<Link to="/" className="btn btn-primary">
							OK
						</Link>
					</div>
					<div className="col" align="center">
						<Link to="/" className="btn btn-secondary">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
