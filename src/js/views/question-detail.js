import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/app-context";
import { Answer } from "../component/answer";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";

export const QuestionDetail = () => {
	const [loading, setLoading] = useState(true);
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [question, setQuestion] = useState({});
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		useEffectAsync();
	}, []);

	async function useEffectAsync() {
		await checkProtected();
		const questionById = await getQuestionById();
		setQuestion(questionById);
		const answersByQuestionId = getAnswersByQuestionId();
		setAnswers(answersByQuestionId);
	}

	async function checkProtected() {
		let responseJson = await actions.fetchCheckProtected();
		if (responseJson.status !== undefined && responseJson.status === "OK") {
			alert("Usuario correcto");
			setLoading(false);
		} else {
			alert("Usuario no existe");
			history.push("/");
		}
	}

	function getQuestionById() {
		//return actions.getQuestionById(id);
		return actions.fetchGetQuestionById(id);
	}

	function getAnswersByQuestionId() {
		return actions.getAnswersByQuestionId(id);
	}

	let mapAnswers = answers.map((answer, index) => {
		return <Answer key={index} id={answer.id} title={answer.title} description={answer.description} />;
	});

	function questionDeletedOK() {
		$("#questionDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function deleteQuestion() {
		history.push("/questions");
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	if (loading == true) {
		return "Loading...";
	}

	return (
		<div className="container">
			<div className="border border-secondary mb-3 p-2">
				<div className="mb-2 d-flex justify-content-end">
					<Link to={id + "/edit-question"}>
						<Button label={"Edit Question"} color={"primary"} />
					</Link>
					<div className="ml-2">
						<Button label={"Delete Question"} color={"danger"} onClick={questionDeletedOK} />
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
			<div>{mapAnswers}</div>
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
