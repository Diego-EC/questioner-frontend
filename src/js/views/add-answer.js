import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doPostFetch, doFetchUploadImages } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Context } from "../store/app-context";
import { AlertInfoSnippetCode } from "../component/alert-info-snippet-code";
import { RichTextEditor } from "../component/rich-text-editor";

export const AddAnwser = () => {
	const ADD_ANSWER_ENDPOINT = "answer";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [description, setDesciption] = useState("");
	const [link, setLink] = useState("");
	const [files, setFiles] = useState(null);
	const [loading, setLoading] = useState(false);

	async function answerCreatedOK() {
		setLoading(true);
		let descriptionAux = description;
		if (description.length > 5000) {
			descriptionAux = description.substr(0, 5000);
		}
		let data = {
			id_question: id,
			id_user: actions.getLoggedUserID(),
			description: descriptionAux,
			link: link
		};
		const responseJsonAnswer = await doPostFetch(Constant.BACKEND_ROOT + ADD_ANSWER_ENDPOINT, data);
		if (files !== null && files.length > 0) {
			await sendImages(responseJsonAnswer.answer["id"]);
		}
		setLoading(false);
		history.push(`/question-detail/${id}`);
	}

	async function sendImages(IDAnswer) {
		const formData = new FormData();
		formData.append("id_answer", IDAnswer);
		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}
		await doFetchUploadImages(Constant.BACKEND_ROOT + "upload-answer-images", formData);
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	let buttonSaveHTML = "";
	if (loading === true) {
		buttonSaveHTML = (
			<button className="btn btn-primary" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Saving...</span>
			</button>
		);
	} else {
		buttonSaveHTML = <Button label={"Save"} color={"primary"} onClick={answerCreatedOK} />;
	}

	function onEditorStateChange(currentContentAsHTML) {
		setDesciption(currentContentAsHTML);
	}

	return (
		<div className="container bg-q-secondary border-q-default p-3 shadow-sm mt-4">
			<h1 className="text-center mt-3 mb-5">Add Anwser</h1>
			<form action="">
				<div className="form-group">
					<label htmlFor="text-area">Description:</label>
					<RichTextEditor isReadOnly={false} onEditorStateChange={onEditorStateChange} />
					<div className="invalid-feedback">Please write a description for the question.</div>
				</div>

				<div className="form-group mt-5">
					<label htmlFor="exampleFormControlFile1">Upload Files:</label>
					<input
						name="document"
						type="file"
						className="form-control-file"
						id="exampleFormControlFile1"
						multiple
						onChange={event => setFiles(event.currentTarget.files)}
					/>
				</div>

				<div className="form-group mt-5">
					<AlertInfoSnippetCode />
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Here the link to your code ;)"
							aria-label="add link"
							aria-describedby="add link"
							onChange={event => setLink(event.target.value)}
							maxLength="255"
						/>
					</div>
				</div>

				<div className="row justify-content-center mt-5">
					<div className="col" align="right">
						{buttonSaveHTML}

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
