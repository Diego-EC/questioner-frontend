import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../store/app-context";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch, doPutFetch, doFetchUploadImages, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Image } from "../component/bootstrap/image";
import { AlertInfoSnippetCode } from "../component/alert-info-snippet-code";

export const EditQuestion = () => {
	const QUESTION_ENDPOINT = "question";
	const QUESTION_IMAGE_ENDPOINT = "question-image";
	const QUESTION_IMAGES_BY_QUESTION_ID_ENDPOINT = "question-images-by-question-id";
	const history = useHistory();
	let { id } = useParams();
	const { store, actions } = useContext(Context);
	const [title, setTitle] = useState("");
	const [description, setDesciption] = useState("");
	const [files, setFiles] = useState([]);
	const [filesHTML, setFilesHTML] = useState([]);
	const [link, setLink] = useState("");

	useEffect(() => {
		init();
	}, []);

	function fileSelected(event) {
		let input = event.currentTarget;
		setFiles(input.files);
	}

	async function init() {
		let question = await doGetFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id);

		const responseQuestionImages = await doGetFetch(
			Constant.BACKEND_ROOT + QUESTION_IMAGES_BY_QUESTION_ID_ENDPOINT + "/" + id
		);
		let mappedImages = mapImages(responseQuestionImages);
		setDefaultQuestionValues(question, mappedImages);
	}

	function mapImages(images) {
		let imagesMap;
		if (images) {
			imagesMap = images.map(function(image, index) {
				return (
					<div key={index} className="img-thumbnail col-4 my-1 justify-content-center">
						<Image id={image.id} src={image.url} isDeleteable={true} onDeleteImage={deleteQuestionImage} />
					</div>
				);
			});
		}
		return imagesMap;
	}

	async function deleteQuestionImage(imageID) {
		let json = await doDeleteFetch(Constant.BACKEND_ROOT + QUESTION_IMAGE_ENDPOINT + "/" + imageID);
		const responseQuestionImages = await doGetFetch(
			Constant.BACKEND_ROOT + QUESTION_IMAGES_BY_QUESTION_ID_ENDPOINT + "/" + id
		);
		let mappedImages = mapImages(responseQuestionImages);
		setFilesHTML(mappedImages);
	}

	function setDefaultQuestionValues(question, questionImages) {
		setTitle(question.title);
		setDesciption(question.description);
		setFilesHTML(questionImages);
		setLink(question.link);
	}

	async function updateQuestion() {
		let data = {
			title: title,
			description: description,
			link: link
		};
		let json = await doPutFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id, data);
		await sendImages(id);
		history.push(`/question-detail/${id}`);
	}

	function questionUpdatedOK() {
		$("#questionUpdatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	async function sendImages(IDQuestion) {
		const formData = new FormData();
		formData.append("id_question", IDQuestion);
		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}
		await doFetchUploadImages(Constant.BACKEND_ROOT + "upload-question-images", formData);
	}

	function openGist() {
		window.open("https://gist.github.com/", "_blank");
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
					<label htmlFor="exampleFormControlFile1">Upload Files:</label>
					<input
						name="document"
						type="file"
						className="form-control-file"
						id="exampleFormControlFile1"
						multiple
						onChange={event => fileSelected(event)}
					/>
					<div className="row mt-3">{filesHTML}</div>
				</div>

				<div className="form-group">
					<AlertInfoSnippetCode />
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Here the link to your code"
							aria-label="add link"
							aria-describedby="add link"
							onChange={event => setLink(event.target.value)}
							defaultValue={link}
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
						{/*<Button label={"Save"} color={"primary"} onClick={questionUpdatedOK} />*/}
						<Button label={"Save"} color={"primary"} onClick={updateQuestion} />
						<Modal
							id={"questionUpdatedOK"}
							title={"Question Edited"}
							text={"Soon you will have an answer ;)"}
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
