import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const AddQuestion = () => {
	const ADD_QUESTION_ENDPOINT = "question";
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [description, setDesciption] = useState("");
	const [link, setLink] = useState("");

	async function questionCreatedOK() {
		//$("#questionCreatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
		let data = {
			id_user: store.loggedUser.id,
			title: title,
			description: description,
			link: link
		};
		await doPostFetch(Constant.BACKEND_ROOT + ADD_QUESTION_ENDPOINT, data);
		history.push(`/questions`);
	}

	function closeModal() {
		history.push("/questions");
	}

	return (
		<div className="container">
			<h1 className="text-center">Add Question</h1>

			<form action="" className="was-validated" noValidate="">
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						className="form-control"
						id="title"
						aria-describedby="title"
						placeholder="Title"
						onChange={event => setTitle(event.target.value)}
						required
					/>
					<div className="invalid-feedback">Please write a title for the question.</div>
				</div>

				<div className="form-group">
					<label htmlFor="text-area">Description:</label>
					<textarea
						className="form-control"
						id="text-area"
						rows="3"
						placeholder="Description"
						onChange={event => setDesciption(event.target.value)}
						required></textarea>
					<div className="invalid-feedback">Please write a description for the question.</div>
				</div>

				<div className="form-group">
					<label htmlFor="text-area">Upload Files:</label>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Upload</span>
						</div>
						<div className="custom-file">
							<input type="file" className="custom-file-input" id="upload-files" />
							<label className="custom-file-label" htmlFor="upload-files">
								Choose file
							</label>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="text-area">Add Links:</label>

					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Link"
							aria-label="add link"
							aria-describedby="add link"
							onChange={event => setLink(event.target.value)}
						/>
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button">
								Add Link
							</button>
						</div>
					</div>
				</div>

				<div className="row justify-content-center mt-5">
					<div className="col" align="right">
						<Button label={"Save"} color={"primary"} onClick={questionCreatedOK} />
						<Modal
							id={"questionCreatedOK"}
							title={"Question Saved"}
							text={"Soon you will have an answer ;)"}
							close={closeModal}
						/>
					</div>
					<div className="col" align="left">
						<Link to="/questions">
							<Button label={"Cancel"} color={"secondary"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
