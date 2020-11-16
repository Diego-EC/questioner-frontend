import React, { useState, useContext } from "react";
import { Context } from "../store/app-context";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Question } from "../component/question";
import { Modal } from "../component/bootstrap/modal";

export const Searcher = () => {
	const SEARCH_QUESTIONS_BY_STRING_ENDPOINT = "search-questions-by-string";
	const { store, actions } = useContext(Context);

	async function search() {
		let searchText = document.getElementById("inputTextSearcher").value;
		if (searchText.length < 3) {
			$("#search").modal({ show: true, keyboard: false, backdrop: "static" });
		} else {
			if (searchText) {
				actions.setSearchText(searchText);
				const filteredQuestionsResponse = await doGetFetch(
					Constant.BACKEND_ROOT + SEARCH_QUESTIONS_BY_STRING_ENDPOINT + "/" + searchText
				);
				const questionsMap = mapQuestions(filteredQuestionsResponse.questions);
				actions.setQuestions(questionsMap);
				document.getElementById("inputTextSearcher").value = "";
			}
		}
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
		<div className="input-group">
			<input id="inputTextSearcher" type="text" placeholder="Search" defaultValue={actions.getSearchText()} />
			<div className="input-group-append">
				<button className="btn btn-primary" type="submit" onClick={search}>
					<i className="fas fa-search"></i>
				</button>
			</div>
			<Modal
				id={"search"}
				title={"Search text too short"}
				text={"Please enter a search text greater than two characters"}
				labelCancel="Cancel"
			/>
		</div>
	);
};
