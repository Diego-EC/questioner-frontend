import React from "react";
import { Link } from "react-router-dom";
import { ButtonPrimary } from "../component/bootstrap/button-primary";
import { ButtonSecondary } from "../component/bootstrap/button-secondary";

export const CreateUser = () => {
	return (
		<div className="container">
			<h1 className="text-center">Create User Account</h1>
			<form action="">
				<label htmlFor="email">Username:</label>
				<div className="form-group">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								@
							</span>
						</div>
						<input type="text" className="form-control" placeholder="Username" aria-label="Username" />
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
				</div>

				<div className="row mt-5">
					<div className="col" align="right">
						<Link to="/">
							<ButtonPrimary label={"OK"} />
						</Link>
					</div>
					<div className="col" align="left">
						<Link to="/">
							<ButtonSecondary label={"Cancel"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
