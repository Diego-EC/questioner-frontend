import React from "react";
import { Link } from "react-router-dom";
import { ButtonPrimary } from "../component/bootstrap/button-primary";
import { ButtonSecondary } from "../component/bootstrap/button-secondary";
import { Modal } from "../component/bootstrap/modal";

export const ForgotPassword = () => {
	function resetOk() {
		alert("Success! \n You will receive an email with the instructions to reset your password.");
	}

	return (
		<div className="container">
			<h1 className="text-center">Reset Password</h1>
			<form action="">
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
				</div>
				<div className="row mt-5">
					<div className="col" align="right">
						<Link to="/">
							<ButtonPrimary label={"Send"} onClick={resetOk} />
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
