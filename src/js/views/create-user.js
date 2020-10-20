import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ButtonPrimary } from "../component/bootstrap/button-primary";
import { ButtonSecondary } from "../component/bootstrap/button-secondary";
import { Modal } from "../component/bootstrap/modal";

export const CreateUser = () => {
	const history = useHistory();

	function userCreatedOk() {
		$("#userCreatedOk").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push("/");
	}

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
						<ButtonPrimary label={"Create"} onClick={userCreatedOk} />
						<Modal
							id={"userCreatedOk"}
							title={"Usuario creado"}
							text={"Revisa tu correo electónico para confirmar la cuenta."}
							close={closeModal}
						/>
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
