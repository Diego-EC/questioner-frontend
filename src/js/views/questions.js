import React, { useState, useEffect, useContext } from "react";
import { Question } from "../component/question";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Context } from "../store/app-context";
import { Button } from "../component/bootstrap/button";

export const Questions = () => {
	const QUESTIONS_ENDPOINT = "questions";
	const SEARCH_QUESTIONS_BY_STRING_ENDPOINT = "search-questions-by-string";
	const { store, actions } = useContext(Context);

	useEffect(() => {
		init();
	}, []);

	async function deleteFilter() {
		actions.setSearchText(null);
		const questions = await doGetFetch(Constant.BACKEND_ROOT + QUESTIONS_ENDPOINT);
		const questionsMap = mapQuestions(questions);
		actions.setQuestions(questionsMap);
	}

	let searchText = actions.getSearchText();
	let buttonResetFilterHTML = "";
	if (searchText) {
		buttonResetFilterHTML = (
			<div className="alert border-q-primary bg-q-default">
				<p className="h4">
					Search result by: <b>{searchText}</b>
				</p>
				<Button label={"Delete Filter"} color={"q-primary"} onClick={deleteFilter} />
			</div>
		);
	} else {
		buttonResetFilterHTML = "";
	}

	async function init() {
		let searchText = actions.getSearchText();
		let questions;
		if (searchText) {
			const questionsResponse = await doGetFetch(
				Constant.BACKEND_ROOT + SEARCH_QUESTIONS_BY_STRING_ENDPOINT + "/" + searchText
			);
			questions = questionsResponse.questions;
		} else {
			questions = await doGetFetch(Constant.BACKEND_ROOT + QUESTIONS_ENDPOINT);
		}
		const questionsMap = mapQuestions(questions);
		actions.setQuestions(questionsMap);
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
		<div className="">
			<div className="container">
				{buttonResetFilterHTML}
				{actions.getQuestions()}
			</div>
		</div>
	);
};
