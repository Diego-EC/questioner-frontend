import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/app-context";
import { Answer } from "../component/answer";
import { Button } from "../component/bootstrap/button";
import { Image } from "../component/bootstrap/image";
import { Modal } from "../component/bootstrap/modal";
import { doGetFetch, doDeleteFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { RichTextEditor } from "../component/rich-text-editor";

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
	let linkSnippetHTML = "";
	if (question.id_user == actions.getLoggedUserID()) {
		buttonEditQuestionHTML = (
			<Link to={id + "/edit-question"}>
				<Button label={"Edit Question"} color={"q-highlight"} />
			</Link>
		);
		buttonDeleteQuestionHTML = <Button label={"Delete Question"} color={"q-secondary"} onClick={deleteQuestion} />;
	}
	if (question.link) {
		linkSnippetHTML = (
			<div className="my-3">
				<p>
					<b>
						Snippet<br></br>
					</b>
					<a href={question.link} target="_blank" rel="noopener noreferrer">
						{question.link}
					</a>
				</p>
			</div>
		);
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
						link={answer.link}
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
			<div className="border border-q-default shadow-sm mt-4 mb-5 p-3 bg-q-secondary">
				<div className="row justify-content-between mx-0 mb-3">
					<div>
						<span>By: {user.name}</span>
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
				<p className="h2 mb-3">{question.title}</p>
				<div className="mb-3">
					<RichTextEditor isReadOnly={true} description={question.description} />
				</div>

				<div className="row mx-0 mb-5">{questionImages}</div>
				<div className="mb-3">{linkSnippetHTML}</div>
			</div>
			<div>{answers}</div>
			<div className="row justify-content-center">
				<div className="col" align="right">
					<Link to={"/question-detail/" + id + "/add-answer"}>
						<Button label={"Add Answer"} color={"q-primary"} />
					</Link>
				</div>
				<div className="col" align="left">
					<Link to="/questions">
						<Button label={"Go Back"} color={"q-secondary"} />
					</Link>
				</div>
			</div>
		</div>
	);
};
