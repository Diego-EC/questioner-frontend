import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "../component/bootstrap/modal";
import { Button } from "../component/bootstrap/button";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const CreateUser = () => {
	const USER_ENDPOINT = "user";
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function createUser() {
		// validar
		if (password !== repeatedPassword) {
			$("#passwordsDoNotMatch").modal({ show: true, keyboard: false, backdrop: "static" });
			return;
		}
		if (name === "" || email === "" || password === "" || repeatedPassword === "") {
			$("#unfilledFields").modal({ show: true, keyboard: false, backdrop: "static" });
			return;
		}
		// fetch
		setLoading(true);
		let data = {
			name: name,
			email: email,
			password: password
		};
		let responseJsonUser = await doPostFetch(Constant.BACKEND_ROOT + USER_ENDPOINT, data);
		// mensaje OK
		setLoading(false);
		if (responseJsonUser) {
			$("#userCreatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
		}
		// ir a login
	}

	function userCreatedOK() {
		$("#userCreatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push("/");
	}

	let buttonCreateHTML = "";
	if (loading === true) {
		buttonCreateHTML = (
			<button className="btn btn-primary" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Creating...</span>
			</button>
		);
	} else {
		buttonCreateHTML = <Button label={"Create"} color={"primary"} onClick={createUser} />;
	}

	return (
		<div className="container">
			<h1 className="text-center">Create User Account</h1>
			<form className="was-validated">
				<label htmlFor="email">Username:</label>
				<div className="form-group">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								@
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							aria-label="Username"
							onChange={event => setName(event.target.value)}
							required
						/>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Enter email"
						name="email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Enter Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter password"
						name="password"
						onChange={event => setPassword(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Repeat Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Repeat password"
						name="password"
						onChange={event => setRepeatedPassword(event.target.value)}
						required
					/>
				</div>

				<div className="row mt-5">
					<div className="col" align="right">
						{buttonCreateHTML}
						<Modal
							id={"userCreatedOK"}
							title={"User created"}
							text={"User created successfully"}
							cancelCallbackFunction={closeModal}
						/>
					</div>
					<Modal id={"passwordsDoNotMatch"} title={"Data Validation Error"} text={"Passwords do not match"} />
					<Modal
						id={"unfilledFields"}
						title={"Data Validation Error"}
						text={"Please, fill in all the required fields"}
					/>
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
