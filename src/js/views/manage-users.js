import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Switches } from "../component/bootstrap/switches";
import { Button } from "../component/bootstrap/button";
import { Context } from "../store/app-context";

export const ManageUsers = () => {
	const { store, actions } = useContext(Context);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const allUsers = getAllUsers();
		const usersMap = mapUsers(allUsers);
		setUsers(usersMap);
	}, []);

	function getAllUsers() {
		return actions.getAllUsers();
	}

	function mapUsers(allUsers) {
		let usersMap;
		if (allUsers) {
			usersMap = allUsers.map(function(user, index) {
				return (
					<tr key={index}>
						<td>{user.name}</td>
						<td className="d-none d-sm-table-cell">{user.email}</td>
						<td>
							<Switches idUser={user.id} />
						</td>
					</tr>
				);
			});
		}
		return usersMap;
	}

	return (
		<div className="container">
			<h1 className="text-center mb-3">Manage Users</h1>
			<form className="" action="">
				<div className="">
					<table className="table table-responsive w-100 d-inline-block d-md-table">
						<thead className="">
							<tr>
								<th scope="col">User</th>
								<th scope="col" className="d-none d-sm-table-cell">
									Email
								</th>
								<th scope="col">Active</th>
							</tr>
						</thead>
						<tbody className="">{users}</tbody>
					</table>
				</div>
				<div className="row justify-content-center mt-5">
					<div className="col" align="center">
						<Link to="/questions">
							<Button label={"Go Back"} color={"primary"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
