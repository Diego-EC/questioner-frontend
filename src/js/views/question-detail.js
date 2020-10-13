import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/app-context";

export const QuestionDetail = () => {
	let { id } = useParams();
	const { store, actions } = useContext(Context);
	const [question, setQuestion] = useState({});

	useEffect(() => {
		const questionById = getQuestionById();
		setQuestion(questionById);
	}, []);

	function getQuestionById() {
		return actions.getQuestionById(id);
	}
	return (
		<div className="container">
			<h1 className="text-center">Question Detail {id}</h1>
			<h2>{question.title}</h2>
			<p>{question.description}</p>
			<div className="row justify-content-center">
				<div className="col" align="right">
					<Link to="/questions" className="btn btn-secondary">
						Go Back
					</Link>
				</div>
			</div>
		</div>
	);
};
