import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";
import { doPutFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const Answer = props => {
	Answer.propTypes = {
		id: PropTypes.number,
		idUser: PropTypes.number,
		description: PropTypes.string,
		idQuestionOwner: PropTypes.number,
		idQuestion: PropTypes.number
	};
	const MARK_BEST_ANSWER_ENDPOINT = "mark-best-answer";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);

	let buttonChooseAsBestAnswer = "";
	let buttonEditAnswer = "";
	let buttonDeleteAnswer = "";
	if (props.idUser == store.loggedUser.id) {
		buttonEditAnswer = (
			<Link to={id + "/edit-answer"}>
				<Button label={"Edit answer"} color={"primary"} />
			</Link>
		);
		buttonDeleteAnswer = <Button label={"Delete answer"} color={"danger"} onClick={answerDeletedOK} />;
	}
	if (props.idQuestionOwner == store.loggedUser.id) {
		buttonChooseAsBestAnswer = (
			<Button label={"Choose as Best Answer"} color={"primary"} onClick={chooseAsBestAnswer} />
		);
	}

	function chooseAsBestAnswer() {
		let data = {
			id_question: props.idQuestion,
			id_answer: props.id
		};
		doPutFetch(Constant.BACKEND_ROOT + MARK_BEST_ANSWER_ENDPOINT, data);
	}

	function answerDeletedOK() {
		$("#answerDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function deleteAnswer() {
		history.push(`/question-detail/${id}`);
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="card mb-3">
			<div className="card-header">
				<div className="d-flex justify-content-end">
					<div className="">{buttonChooseAsBestAnswer}</div>
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
			<div className="card-body">
				<p className="card-text">{props.description}</p>
			</div>
		</div>
	);
};
