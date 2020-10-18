import React, { useState, useContext, useEffect } from "react";
import { Question } from "../component/question";
import { Context } from "../store/app-context";

export const Questions = () => {
	const { store, actions } = useContext(Context);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const allQuestions = getAllQuestions();
		const questionsMap = mapQuestions(allQuestions);
		setQuestions(questionsMap);
	}, []);

	function getAllQuestions() {
		return actions.getAllQuestions();
	}

	function mapQuestions(allQuestions) {
		let questionsMap;
		if (allQuestions) {
			questionsMap = allQuestions.map(function(question, index) {
				return (
					<Question
						key={index}
						id={question.id}
						title={question.title}
						description={question.description}
						isAnswered={question.isAnswered}
						numberOfAnswers={question.numberOfAnswers}
					/>
				);
			});
		}
		return questionsMap;
	}

	return (
		<div className="container">
			<div className="container">{questions}</div>
		</div>
	);
};
