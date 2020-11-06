import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../store/app-context";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch, doPutFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const EditAnswer = () => {
	const ANSWER_ENDPOINT = "answer";
	const history = useHistory();
	let { idQuestion, idAnswer } = useParams();
	const { store, actions } = useContext(Context);
	const [description, setDesciption] = useState("");
	const [link, setLink] = useState("");

	useEffect(() => {
		init();
	}, []);

	async function updateAnswer() {
		let data = {
			description: description,
			link: link
		};
		let json = await doPutFetch(Constant.BACKEND_ROOT + ANSWER_ENDPOINT + "/" + idAnswer, data);
		history.push(`/question-detail/${idQuestion}`);
	}

	async function init() {
		const answer = await doGetFetch(Constant.BACKEND_ROOT + ANSWER_ENDPOINT + "/" + idAnswer);
		setDefaultAnswerValues(answer);
	}

	function setDefaultAnswerValues(answer) {
		setDesciption(answer.description);
		setLink(answer.link);
	}

	function answerUpdatedOK() {
		$("#answerUpdatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push(`/question-detail/${idQuestion}`);
	}

	return (
		<div className="container">
			<h1 className="text-center">Edit Answer</h1>

			<form action="" className="was-validated" noValidate="">
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
					<div className="invalid-feedback">Please write a description for the answer.</div>
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
							defaultValue={link}
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
						{/*<Button label={"Save"} color={"primary"} onClick={answerUpdatedOK} />*/}
						<Button label={"Save"} color={"primary"} onClick={updateAnswer} />
						<Modal
							id={"answerUpdatedOK"}
							title={"Answer Edited"}
							text={"Thank you ;)"}
							cancelCallbackFunction={closeModal}
						/>
					</div>
					<div className="col" align="left">
						<Link to={"/question-detail/" + idQuestion}>
							<Button label={"Cancel"} color={"secondary"} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
