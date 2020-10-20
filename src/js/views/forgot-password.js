import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "../component/bootstrap/modal";
import { Button } from "../component/bootstrap/button";

export const ForgotPassword = () => {
	const history = useHistory();

	function resetOK() {
		$("#passwordResetOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push("/");
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
						<Button label={"Send"} color={"primary"} onClick={resetOK} />
						<Modal
							id={"passwordResetOK"}
							title={"Passwod Reseted"}
							text={"You will receive an email with the instructions to reset the password."}
							close={closeModal}
						/>
					</div>
					<div className="col" align="left">
						<Link to="/">
							<Button label={"Cancel"} color={"secondary"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
