import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/app-context";
import { Answer } from "../component/answer";
import { Button } from "../component/bootstrap/button";

export const QuestionDetail = () => {
	let { id } = useParams();
	const { store, actions } = useContext(Context);
	const [question, setQuestion] = useState({});
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		const questionById = getQuestionById();
		setQuestion(questionById);
		const answersByQuestionId = getAnswersByQuestionId();
		setAnswers(answersByQuestionId);
	}, []);

	function getQuestionById() {
		return actions.getQuestionById(id);
	}

	function getAnswersByQuestionId() {
		return actions.getAnswersByQuestionId(id);
	}

	let mapAnswers = answers.map((answer, index) => {
		return <Answer key={index} id={answer.id} title={answer.title} description={answer.description} />;
	});

	return (
		<div className="container">
			<div className="border border-secondary mb-3 p-2">
				<div className="mb-2 d-flex justify-content-end">
					<Link to={id + "/edit-question"}>
						<Button label={"Edit Question"} color={"primary"} />
					</Link>
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
