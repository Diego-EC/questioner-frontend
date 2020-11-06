import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/app-context";
import { Answer } from "../component/answer";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const QuestionDetail = () => {
	const QUESTION_ENDPOINT = "question";
	const ANSWERS_BY_QUESTION_ID_ENDPOINT = "answers-by-question-id";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [question, setQuestion] = useState({});
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		init();
	}, []);

	let buttonEditQuestionHTML = "";
	let buttonDeleteQuestionHTML = "";
	if (question.id_user == store.loggedUser.id) {
		buttonEditQuestionHTML = (
			<Link to={id + "/edit-question"}>
				<Button label={"Edit Question"} color={"primary"} />
			</Link>
		);
		buttonDeleteQuestionHTML = <Button label={"Delete Question"} color={"danger"} onClick={questionDeletedOK} />;
	}

	async function init() {
		const responseQuestion = await doGetFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id);
		setQuestion(responseQuestion);
		const answers = await doGetFetch(Constant.BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id);
		const answersMap = mapAnswers(answers, responseQuestion.id_user);
		setAnswers(answersMap);
	}

	function mapAnswers(answers, idQuestionOwner) {
		let answersMap;
		if (answers) {
			answersMap = answers.map(function(answer, index) {
				console.log("answer.id " + answer.id);
				return (
					<Answer
						key={index}
						id={answer.id}
						idUser={answer.id_user}
						description={answer.description}
						idQuestionOwner={idQuestionOwner}
						idQuestion={id}
						onDeleteAnswer={onDeleteAnswer}
					/>
				);
			});
		}
		console.log("answersMap");
		console.log(answersMap);
		return answersMap;
	}

	async function onDeleteAnswer() {
		console.log("onDeleteAnswer");
		const answers = await doGetFetch(Constant.BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id);
		const answersMap = mapAnswers(answers, question.id_user);
		setAnswers(answersMap);
	}

	function questionDeletedOK() {
		$("#questionDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function deleteQuestion() {
		history.push("/questions");
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="container">
			<div className="border border-secondary mb-3 p-2">
				<div className="mb-2 d-flex justify-content-end">
					{buttonEditQuestionHTML}
					<div className="ml-2">
						{buttonDeleteQuestionHTML}
						<Modal
							id={"questionDeletedOK"}
							title={"Are you sure you want to delete the question?"}
							text={"All the answers will also be deleted."}
							okCallbackFunction={deleteQuestion}
							cancelCallbackFunction={closeModal}
							labelOK="OK"
							labelCancel="Cancel"
						/>
					</div>
				</div>
				<p className="h2">{question.title}</p>
				<p>{question.description}</p>
			</div>
			<div>{answers}</div>
			<div className="mt-5 row justify-content-center">
				<div className="col" align="right">
					<Link to={"/question-detail/" + id + "/add-answer"}>
						<Button label={"Add Answer"} color={"primary"} />
					</Link>
				</div>
				<div className="col" align="left">
					<Link to="/questions">
						<Button label={"Go Back"} color={"secondary"} />
					</Link>
				</div>
			</div>
		</div>
	);
};
