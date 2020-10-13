import React from "react";
import { Link } from "react-router-dom";

export const Admin = () => {
	return (
		<div className="container">
			<h1 className="text-center">Admin</h1>
			<form action="">
				<div className="row justify-content-center">
					<div className="col" align="center">
						<Link to="/questions" className="btn btn-primary">
							OK
						</Link>
					</div>
					<div className="col" align="center">
						<Link to="/questions" className="btn btn-secondary">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
