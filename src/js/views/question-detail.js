import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/app-context";
import { Answer } from "../component/answer";
import { Button } from "../component/bootstrap/button";
import { Image } from "../component/bootstrap/image";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const QuestionDetail = () => {
	const QUESTION_ENDPOINT = "question";
	const ANSWERS_BY_QUESTION_ID_ENDPOINT = "answers-by-question-id";
	const QUESTION_IMAGES_BY_QUESTION_ID = "question-images-by-question-id";
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [question, setQuestion] = useState({});
	const [answers, setAnswers] = useState([]);
	const [questionImages, setQuestionImages] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		init();
	}, []);

	let buttonEditQuestionHTML = "";
	let buttonDeleteQuestionHTML = "";
	if (question.id_user == actions.getLoggedUserID()) {
		buttonEditQuestionHTML = (
			<Link to={id + "/edit-question"}>
				<Button label={"Edit Question"} color={"primary"} />
			</Link>
		);
		//buttonDeleteQuestionHTML = <Button label={"Delete Question"} color={"danger"} onClick={questionDeletedOK} />;
		buttonDeleteQuestionHTML = <Button label={"Delete Question"} color={"danger"} onClick={deleteQuestion} />;
	}

	async function init() {
		const responseQuestion = await doGetFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id);
		await setQuestion(responseQuestion);
		await setUser(responseQuestion.user);
		const responseQuestionImages = await doGetFetch(
			Constant.BACKEND_ROOT + QUESTION_IMAGES_BY_QUESTION_ID + "/" + id
		);
		let imagesMap = await mapImages(responseQuestionImages);
		setQuestionImages(imagesMap);

		const answers = await doGetFetch(Constant.BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id);
		const answersMap = mapAnswers(answers, responseQuestion.id_user, responseQuestion.id_answer_selected);
		setAnswers(answersMap);
	}

	function mapImages(responseQuestionImages) {
		let imagesMap;
		if (responseQuestionImages) {
			imagesMap = responseQuestionImages.map(function(image, index) {
				return (
					<div key={index} className="img-thumbnail col-4 my-1 justify-content-center">
						<Image id={image.id} src={image.url} />
					</div>
				);
			});
		}
		return imagesMap;
	}

	async function getAnswerImages(answerID) {
		let answerImagesMap = [];
		let responseAnswerImagesJSON = await doGetFetch(
			Constant.BACKEND_ROOT + ANSWER_IMAGES_BY_ANSWER_ID_ENDPOINT + "/" + answerID
		);
		return responseAnswerImagesJSON;
	}

	function mapAnswers(answers, idQuestionOwner, idAnswerSelected) {
		let answersMap;
		if (answers) {
			answersMap = answers.map(function(answer, index) {
				let isBestAnswer = false;
				if (answer.id == idAnswerSelected) {
					isBestAnswer = true;
				}
				return (
					<Answer
						key={index}
						id={answer.id}
						idUser={answer.id_user}
						description={answer.description}
						idQuestionOwner={idQuestionOwner}
						idQuestion={id}
						onDeleteAnswer={onDeleteAnswer}
						isBestAnswer={isBestAnswer}
						onChooseBestAnswer={onChooseBestAnswer}
						userName={answer.user_name}
					/>
				);
			});
		}
		return answersMap;
	}

	async function onChooseBestAnswer() {
		const responseQuestion = await doGetFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id);
		await setQuestion(responseQuestion);
		const answers = await doGetFetch(Constant.BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id);
		const answersMap = mapAnswers(answers, responseQuestion.id_user, responseQuestion.id_answer_selected);
		setAnswers(answersMap);
	}

	async function onDeleteAnswer() {
		const answers = await doGetFetch(Constant.BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id);
		const answersMap = mapAnswers(answers, question.id_user);
		setAnswers(answersMap);
	}

	function questionDeletedOK() {
		$("#questionDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	async function deleteQuestion() {
		let json = await doDeleteFetch(Constant.BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id);
		history.push("/questions");
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="container">
			<div className="border border-secondary mb-3 p-2">
				<div className="row justify-content-between mx-0">
					<div>
						<span>Owner: {user.name}</span>
					</div>
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
				</div>
				<p className="h2">{question.title}</p>
				<p>{question.description}</p>
				<div className="row mx-0">{questionImages}</div>
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
