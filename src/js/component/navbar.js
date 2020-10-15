import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img
					className="img-fluid"
					width="40"
					height="40"
					src={require("../../img/questioner.png")}
					alt="logo"></img>
			</Link>

			<div className="ml-auto">
				<Link to="/">
					<button className="btn btn-secondary">Logout</button>
				</Link>
			</div>
		</nav>
	);
};
