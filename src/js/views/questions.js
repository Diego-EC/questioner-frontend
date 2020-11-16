import React, { useState, useEffect, useContext } from "react";
import { Question } from "../component/question";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Context } from "../store/app-context";

export const Questions = () => {
	const QUESTIONS_ENDPOINT = "questions";
	const [questions, setQuestions] = useState([]);
	const { store, actions } = useContext(Context);

	useEffect(() => {
		init();
	}, []);

	/*let searchResultHTML = "";
	if (actions.getFilteredQuestions() !== null) {
		console.log(actions.getFilteredQuestions());
		searchResultHTML = (
			<div>
				<p>CUCU</p>
			</div>
		);
	}*/

	let searchResultHTML = actions.getFilteredQuestions();
	let buttonResetFilterHTML = "";
	console.log(searchResultHTML.length);
	if (searchResultHTML.length > 0) {
		console.log("SI");
		buttonResetFilterHTML = (
			<div>
				<p>LOL</p>
			</div>
		);
	} else {
		console.log("NO");
		buttonResetFilterHTML = "";
	}

	/*let mapFavorites = store.favorites.map((name, index) => {
		return <Favorite key={index} name={name} />;
	});*/

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
						userName={question.user_name}
						date={question.last_update}
					/>
				);
			});
		}
		return questionsMap;
	}

	return (
		<div className="container">
			{searchResultHTML}
			{buttonResetFilterHTML}
			<div className="container">{questions}</div>
		</div>
	);
};
