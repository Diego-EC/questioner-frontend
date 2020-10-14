import React from "react";
import { Link } from "react-router-dom";

export const MenuBar = () => {
	return (
		<div className="container my-4">
			<div className="row">
				<div className="col-2 my-auto">
					<Link to="/manage-users" className="btn btn-warning text-white">
						Manage Users
					</Link>
				</div>
				<div className="col-8 my-auto">
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"></input>
				</div>
				<div className="col-2 my-auto">
					<Link to="/add-question" className="btn btn-primary">
						Make Question
					</Link>
				</div>
			</div>
		</div>
	);
};
