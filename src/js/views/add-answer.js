import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Context } from "../store/app-context";

export const AddAnwser = () => {
	const ADD_ANSWER_ENDPOINT = "answer";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [description, setDesciption] = useState("");
	const [link, setLink] = useState("");

	async function answerCreatedOK() {
		//$("#answerCreatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
		let data = {
			id_question: id,
			id_user: store.loggedUser.id,
			description: description,
			link: link
		};
		await doPostFetch(Constant.BACKEND_ROOT + ADD_ANSWER_ENDPOINT, data);
		history.push(`/question-detail/${id}`);
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="container">
			<h1 className="text-center">Add Anwser</h1>
			<form action="">
				{/*<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						className="form-control"
						id="title"
						aria-describedby="title"
						placeholder="Title"
						required
					/>
					<div className="invalid-feedback">Please write a title for the question.</div>
    </div>*/}

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
						<Button label={"Save"} color={"primary"} onClick={answerCreatedOK} />
						<Modal
							id={"answerCreatedOK"}
							title={"Answer Saved"}
							text={"Thank you for your collaboration."}
							cancelCallbackFunction={closeModal}
						/>
					</div>
					<div className="col" align="left">
						<Link to={"/question-detail/" + id}>
							<Button label={"Cancel"} color={"secondary"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
