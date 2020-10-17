import React from "react";
import { Link } from "react-router-dom";
import { Searcher } from "./searcher";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
			<Link to="/">
				<img
					className="img-fluid"
					width="40"
					height="40"
					src={require("../../img/questioner.png")}
					alt="logo"></img>
			</Link>

			<button
				className="navbar-toggler my-1"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo03"
				aria-controls="navbarTogglerDemo03"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				<div className="navbar-nav float-right text-right pr-3 ml-auto">
					<div className="mr-2 my-1">
						<Link to="/manage-users" className="btn btn-warning text-white">
							Manage Users
						</Link>
					</div>
					<div className="mr-2 my-1">
						<Searcher />
					</div>
					<div className="mr-2 my-1">
						<Link to="/add-question" className="btn btn-primary">
							Make Question
						</Link>
					</div>
					<div className="mr-2 my-1">
						<Link to="/">
							<button className="btn btn-secondary">
								<span>Logout </span>
								<span className="fas fa-sign-out-alt"></span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
