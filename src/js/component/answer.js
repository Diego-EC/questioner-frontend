import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";
import { doPutFetch, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { BadgeInfo } from "./bootstrap/badge-info";

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
		userName: PropTypes.string
	};
	const MARK_BEST_ANSWER_ENDPOINT = "mark-best-answer";
	const ANSWER_ENDPOINT = "answer";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);

	function onDeleteAnswer() {
		props.onDeleteAnswer();
	}

	let buttonChooseAsBestAnswer = "";
	let buttonEditAnswer = "";
	let buttonDeleteAnswer = "";
	if (props.idUser == store.loggedUser.id) {
		buttonEditAnswer = (
			<Link to={id + "/edit-answer/" + props.id}>
				<Button label={"Edit answer"} color={"primary"} />
			</Link>
		);
		//buttonDeleteAnswer = <Button label={"Delete answer"} color={"danger"} onClick={answerDeletedOK} />;
		buttonDeleteAnswer = <Button label={"Delete answer"} color={"danger"} onClick={deleteAnswer} />;
	}
	if (props.idQuestionOwner == store.loggedUser.id) {
		if (props.isBestAnswer == true) {
			buttonChooseAsBestAnswer = <BadgeInfo label={"Best Answer"} color={"success"} />;
			buttonDeleteAnswer = "";
			buttonEditAnswer = "";
		} else {
			buttonChooseAsBestAnswer = (
				<Button label={"Choose as Best Answer"} color={"primary"} onClick={chooseAsBestAnswer} />
			);
		}
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
	if (props.isBestAnswer == true) {
		borderHighlightHTML = " border-success";
		textHighlightHTML = " text-success";
	}

	return (
		<div className={"card mb-3" + borderHighlightHTML}>
			<div className={"card-header" + borderHighlightHTML}>
				<div className="row justify-content-between">
					<div>
						<span className={textHighlightHTML}>Owner: {props.userName}</span>
					</div>
					<div className="d-flex justify-content-end">
						<div className="ms-1">{buttonChooseAsBestAnswer}</div>
						<div className="ml-1">{buttonEditAnswer}</div>
						<div className="ml-1">
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
			<div className="card-body">
				<p className={"card-text" + textHighlightHTML}>{props.description}</p>
			</div>
		</div>
	);
};
