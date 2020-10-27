import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Searcher } from "./searcher";
import { Button } from "./bootstrap/button";

export const Navbar = () => {
	const history = useHistory();

	function logout() {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken === null) {
			history.push("/");
		}

		localStorage.removeItem("accessToken");
		fetch("https://3000-f4686e89-3f28-4d9f-b041-346f4456ba04.ws-eu01.gitpod.io/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + accessToken,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				history.push("/");
			});
	}

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
				data-target="#menu-bar"
				aria-controls="menu-bar"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="menu-bar">
				<div className="navbar-nav float-right text-right pr-3 ml-auto">
					<div className="mr-2 my-1">
						<Link to="/manage-users">
							<Button label={"Manage Users"} color={"warning"} />
						</Link>
					</div>
					<div className="mr-2 my-1">
						<Searcher />
					</div>
					<div className="mr-2 my-1">
						<Link to="/add-question">
							<Button label={"Make Question"} color={"primary"} />
						</Link>
					</div>
					<div className="mr-2 my-1">
						<Button label={"Logout"} color={"secondary"} icon={"fas fa-sign-out-alt"} onClick={logout} />
					</div>
				</div>
			</div>
		</nav>
	);
};
