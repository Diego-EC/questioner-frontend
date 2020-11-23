import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";
import { doGetFetch, doPutFetch, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { BadgeInfo } from "./bootstrap/badge-info";
import { Image } from "../component/bootstrap/image";
import { RichTextEditor } from "../component/rich-text-editor";
import { BadgeSolved } from "./bootstrap/badge-solved";

export const Answer = props => {
	Answer.propTypes = {
		id: PropTypes.number,
		idUser: PropTypes.number,
		description: PropTypes.string,
		idQuestionOwner: PropTypes.number,
		idQuestion: PropTypes.string,
		onDeleteAnswer: PropTypes.func,
		isBestAnswer: PropTypes.bool,
		onChooseBestAnswer: PropTypes.func,
		userName: PropTypes.string,
		link: PropTypes.string
	};
	const MARK_BEST_ANSWER_ENDPOINT = "mark-best-answer";
	const ANSWER_ENDPOINT = "answer";
	const ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT = "answer-images-by-answer-id";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [answerImages, setAnswerImages] = useState([]);

	useEffect(() => {
		init(props.id);
	}, []);

	async function init(answerID) {
		let answerImagesResponse = await getAnswerImages(answerID);
		let mappedImages = mapImages(answerImagesResponse);
		setAnswerImages(mappedImages);
	}

	async function getAnswerImages(answerID) {
		let answerImagesMap = [];
		let responseAnswerImagesJSON = await doGetFetch(
			Constant.BACKEND_ROOT + ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT + "/" + answerID
		);
		return responseAnswerImagesJSON;
	}

	function mapImages(images) {
		let imagesMap;
		if (images) {
			imagesMap = images.map(function(image, index) {
				return (
					<div key={index} className="img-thumbnail col-4 my-1 justify-content-center">
						<Image id={image.id} src={image.url} />
					</div>
				);
			});
		}
		return imagesMap;
	}

	function onDeleteAnswer() {
		props.onDeleteAnswer();
	}

	let buttonChooseAsBestAnswer = "";
	let buttonEditAnswer = "";
	let buttonDeleteAnswer = "";
	if (props.idUser == actions.getLoggedUserID()) {
		buttonEditAnswer = (
			<div className="ml-2">
				<Link to={id + "/edit-answer/" + props.id}>
					<Button label={"Edit answer"} color={"q-highlight"} />
				</Link>
			</div>
		);
		buttonDeleteAnswer = (
			<div className="ml-2">
				<Button label={"Delete answer"} color={"q-secondary"} onClick={deleteAnswer} />
			</div>
		);
	}
	if (props.isBestAnswer === true) {
		buttonChooseAsBestAnswer = <BadgeSolved />;
	}
	if (props.idQuestionOwner == actions.getLoggedUserID() && props.isBestAnswer === false) {
		buttonChooseAsBestAnswer = <Button label={"Best Answer"} color={"q-alert"} onClick={chooseAsBestAnswer} />;
	}

	async function chooseAsBestAnswer() {
		let data = {
			id_question: props.idQuestion,
			id_answer: props.id
		};
		await doPutFetch(Constant.BACKEND_ROOT + MARK_BEST_ANSWER_ENDPOINT, data);
		props.onChooseBestAnswer();
	}

	function answerDeletedOK() {
		$("#answerDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	async function deleteAnswer() {
		let json = await doDeleteFetch(Constant.BACKEND_ROOT + ANSWER_ENDPOINT + "/" + props.id);

		//history.push(`/question-detail/${id}`);
		props.onDeleteAnswer();
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	let borderHighlightHTML = "";
	let textHighlightHTML = "";
	let linkSnippetHTML = "";
	if (props.isBestAnswer == true) {
		borderHighlightHTML = " border-success";
		textHighlightHTML = " text-success";
	}
	if (props.link) {
		linkSnippetHTML = (
			<div className="my-3">
				<p>
					<b>
						Snippet<br></br>
					</b>
					<a href={props.link} target="_blank" rel="noopener noreferrer">
						{props.link}
					</a>
				</p>
			</div>
		);
	}

	return (
		<div className={"card mb-4 shadow-sm"}>
			<div className={"card-header bg-transparent border-bottom-0"}>
				<div className="row justify-content-between px-3 pt-2">
					<div>
						<span className={""}>By: {props.userName}</span>
					</div>

					<div className="d-flex justify-content-end align-items-center">
						<div>{buttonChooseAsBestAnswer}</div>
						<div>{buttonEditAnswer}</div>
						<div>
							{buttonDeleteAnswer}
							<Modal
								id={"answerDeletedOK"}
								title={"Are you sure you want to delete the answer?"}
								text={"The data will be lost forever."}
								okCallbackFunction={deleteAnswer}
								cancelCallbackFunction={closeModal}
								labelOK="OK"
								labelCancel="Cancel"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="card-body p-3">
				<div className={"card-text"}>
					<RichTextEditor isReadOnly={true} description={props.description} />
				</div>
				<div className="row mx-0 mt-3">{answerImages}</div>
				{linkSnippetHTML}
			</div>
		</div>
	);
};
