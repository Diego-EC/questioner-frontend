import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../store/app-context";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch, doPutFetch, doFetchUploadImages, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Image } from "../component/bootstrap/image";
import { AlertInfoSnippetCode } from "../component/alert-info-snippet-code";

export const EditAnswer = () => {
	const ANSWER_ENDPOINT = "answer";
	const ANSWER_IMAGE_ENDPOINT = "answer-image";
	const ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT = "answer-images-by-answer-id";
	const history = useHistory();
	let { idQuestion, idAnswer } = useParams();
	const { store, actions } = useContext(Context);
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

	async function updateAnswer() {
		let data = {
			description: description,
			link: link
		};
		let json = await doPutFetch(Constant.BACKEND_ROOT + ANSWER_ENDPOINT + "/" + idAnswer, data);
		await sendImages(json.answer["id"]);
		history.push(`/question-detail/${idQuestion}`);
	}

	async function init() {
		const answer = await doGetFetch(Constant.BACKEND_ROOT + ANSWER_ENDPOINT + "/" + idAnswer);
		const responseAnserImages = await doGetFetch(
			Constant.BACKEND_ROOT + ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT + "/" + idAnswer
		);
		let mappedImages = mapImages(responseAnserImages);
		setDefaultAnswerValues(answer, mappedImages);
	}

	function setDefaultAnswerValues(answer, mappedImages) {
		setDesciption(answer.description);
		setFilesHTML(mappedImages);

		setLink(answer.link);
	}

	function answerUpdatedOK() {
		$("#answerUpdatedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function closeModal() {
		history.push(`/question-detail/${idQuestion}`);
	}

	async function sendImages(IDAnser) {
		const formData = new FormData();
		formData.append("id_answer", IDAnser);
		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}
		await doFetchUploadImages(Constant.BACKEND_ROOT + "upload-answer-images", formData);
	}

	function mapImages(images) {
		let imagesMap;
		if (images) {
			imagesMap = images.map(function(image, index) {
				return (
					<div key={index} className="img-thumbnail col-4 my-1 justify-content-center">
						<Image id={image.id} src={image.url} isDeleteable={true} onDeleteImage={deleteAnswerImage} />
					</div>
				);
			});
		}
		return imagesMap;
	}

	async function deleteAnswerImage(imageID) {
		let json = await doDeleteFetch(Constant.BACKEND_ROOT + ANSWER_IMAGE_ENDPOINT + "/" + imageID);
		const responseAnswerImages = await doGetFetch(
			Constant.BACKEND_ROOT + ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT + "/" + idAnswer
		);
		let mappedImages = mapImages(responseAnswerImages);
		setFilesHTML(mappedImages);
	}

	function openGist() {
		window.open("https://gist.github.com/", "_blank");
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
							placeholder="Here the link to your code ;)"
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
