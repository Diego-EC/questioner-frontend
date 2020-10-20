import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../store/app-context";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";

export const EditQuestion = () => {
	const history = useHistory();
	let { id } = useParams();
	const { store, actions } = useContext(Context);
	const [title, setTitle] = useState("");
	const [description, setDesciption] = useState("");

	useEffect(() => {
		useEffectAux();
	}, []);

	async function useEffectAux() {
		await getQuestionById(id);
	}

	async function getQuestionById(id) {
		let question = await actions.getQuestionById(id);
		setDefaultQuestionValues(question);
	}

	function setDefaultQuestionValues(question) {
		setTitle(question.title);
		setDesciption(question.description);
	}

	function questionUpdatedOK() {
		$("#questionUpdatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="container">
			<h1 className="text-center">Edit Question</h1>

			<form action="" className="was-validated" noValidate="">
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						className="form-control"
						id="title"
						aria-describedby="title"
						placeholder="Title"
						required
						onChange={event => setTitle(event.target.value)}
						defaultValue={title}
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
						required
						onChange={event => setDesciption(event.target.value)}
						defaultValue={description}></textarea>
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
						<Button label={"Save"} color={"primary"} onClick={questionUpdatedOK} />
						<Modal
							id={"questionUpdatedOK"}
							title={"Question Edited"}
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
