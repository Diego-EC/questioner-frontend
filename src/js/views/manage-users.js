import React from "react";
import { Link } from "react-router-dom";
import { Switches } from "../component/bootstrap/switches";
import { Button } from "../component/bootstrap/button";

export const ManageUsers = () => {
	return (
		<div className="container">
			<h1 className="text-center mb-3">Manage Users</h1>
			<form className="" action="">
				<div className="">
					<table className="table table-responsive w-100 d-inline-block d-md-table">
						<thead className="">
							<tr>
								<th scope="col">User</th>
								<th scope="col" className="d-none d-sm-block">
									Email
								</th>
								<th scope="col">Active</th>
							</tr>
						</thead>
						<tbody className="">
							<tr>
								<td>Dieo Ezquerro Calvo</td>
								<td className="d-none d-sm-block">diego.ezquerro@gmail.com</td>
								<td>
									<Switches idUser={"1"} />
								</td>
							</tr>
							<tr>
								<td>kristen_khan</td>
								<td className="d-none d-sm-block">kristen_khan@hotmail.com</td>
								<td>
									<Switches idUser={"2"} />
								</td>
							</tr>
							<tr>
								<td>tuan_mccormick</td>
								<td className="d-none d-sm-block">tuan_mccormick@aol.com</td>
								<td>
									<Switches idUser={"3"} />
								</td>
							</tr>
							<tr>
								<td>kyung_prentice</td>
								<td className="d-none d-sm-block">kyung_prentice@outlook.com</td>
								<td>
									<Switches idUser={"4"} />
								</td>
							</tr>
							<tr>
								<td>lesha_iles</td>
								<td className="d-none d-sm-block">lesha_iles@hotmail.com</td>
								<td>
									<Switches idUser={"5"} />
								</td>
							</tr>
							<tr>
								<td>chris_buxton</td>
								<td className="d-none d-sm-block">chris_buxton@gmail.com</td>
								<td>
									<Switches idUser={"6"} />
								</td>
							</tr>
							<tr>
								<td>tamra_gould</td>
								<td className="d-none d-sm-block">tamra_gould@gmail.com</td>
								<td>
									<Switches idUser={"7"} />
								</td>
							</tr>
							<tr>
								<td>lurlene_bourne</td>
								<td className="d-none d-sm-block">lurlene_bourne@aol.com</td>
								<td>
									<Switches idUser={"8"} />
								</td>
							</tr>
						</tbody>
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
