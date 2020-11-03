import React, { useState, useEffect } from "react";
import { Question } from "../component/question";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const Questions = () => {
	const QUESTIONS_ENDPOINT = "questions";
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		init();
	}, []);

	async function init() {
		const questions = await doGetFetch(Constant.BACKEND_ROOT + QUESTIONS_ENDPOINT);
		const questionsMap = mapQuestions(questions);
		setQuestions(questionsMap);
	}

	function mapQuestions(questions) {
		let questionsMap;
		if (questions) {
			questionsMap = questions.map(function(question, index) {
				return (
					<Question
						key={index}
						id={question.id}
						title={question.title}
						description={question.description}
						idAnswerSelected={question.id_answer_selected}
						numberOfAnswers={question.number_of_answers}
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
