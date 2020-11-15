import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { AlertInfoSnippetCode } from "../component/alert-info-snippet-code";

export const AddQuestion = () => {
	const ADD_QUESTION_ENDPOINT = "question";
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [description, setDesciption] = useState("");
	const [link, setLink] = useState("");
	const [files, setFiles] = useState(null);
	//const [IDQuestion, setIDQuestion] = useState(0);

	function fileSelected(event) {
		let input = event.currentTarget;
		setFiles(input.files);
	}

	async function sendImages(IDQuestion) {
		const formData = new FormData();
		formData.append("id_question", IDQuestion);
		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}
		await fetch(Constant.BACKEND_ROOT + "upload-question-images", {
			method: "POST",
			body: formData
		})
			.then(
				response => response.json() // if the response is a JSON object
			)
			.then(
				success => console.log(success) // Handle the success response object
			)
			.catch(
				error => console.log(error) // Handle the error response object
			);
	}

	async function questionCreatedOK() {
		//$("#questionCreatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
		let data = {
			id_user: actions.getLoggedUserID(),
			title: title,
			description: description,
			link: link
		};
		let responseJsonQuestion = await doPostFetch(Constant.BACKEND_ROOT + ADD_QUESTION_ENDPOINT, data);
		console.log(responseJsonQuestion.question["id"]);
		// TODO?
		//setIDQuestion(responseJsonQuestion.question["id"]);
		if (files !== null && files.length > 0) {
			await sendImages(responseJsonQuestion.question["id"]);
		}
		history.push(`/questions`);
	}

	function closeModal() {
		history.push("/questions");
	}

	function openGist() {
		window.open("https://gist.github.com/", "_blank");
	}

	return (
		<div className="container">
			<h1 className="text-center">Make Question</h1>

			<form className="was-validated">
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
					<label htmlFor="exampleFormControlFile1">Upload Files:</label>
					<input
						name="document"
						type="file"
						className="form-control-file"
						id="exampleFormControlFile1"
						multiple
						onChange={event => fileSelected(event)}
					/>
				</div>

				{/*<div className="form-group">
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
                </div>*/}

				<div className="form-group">
					<AlertInfoSnippetCode />
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Here the link to your code ;)"
							aria-label="add link"
							aria-describedby="add link"
							onChange={event => setLink(event.target.value)}
						/>
						<div className="input-group-append">
							<button onClick={openGist} className="btn btn-outline-primary" type="button">
								Create a Gist
							</button>
						</div>
					</div>
				</div>

				<div className="row justify-content-center mt-5">
					<div className="col" align="right">
						<Button label={"Save"} color={"primary"} onClick={questionCreatedOK} />
						{/*<Button label={"Save"} color={"primary"} onClick={sendImages} />*/}
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
