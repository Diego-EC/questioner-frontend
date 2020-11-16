import React, { useState, useContext } from "react";
import { Context } from "../store/app-context";
import { doGetFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Question } from "../component/question";

export const Searcher = () => {
	const SEARCH_QUESTIONS_BY_STRING_ENDPOINT = "search-questions-by-string";
	const [searchText, setSearchText] = useState("");
	const { store, actions } = useContext(Context);

	async function search() {
		let data = {
			search_text: searchText
		};
		console.log(searchText);
		const filteredQuestionsResponse = await doGetFetch(
			Constant.BACKEND_ROOT + SEARCH_QUESTIONS_BY_STRING_ENDPOINT + "/" + searchText
		);
		console.log(filteredQuestionsResponse);
		console.log(filteredQuestionsResponse.questions);
		const questionsMap = mapQuestions(filteredQuestionsResponse.questions);
		actions.setFilteredQuestions(questionsMap);
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

	function getQuestionsFilteredByString() {}

	return (
		<div className="input-group">
			<input
				type="text"
				className="form-control"
				placeholder="Search"
				onChange={event => setSearchText(event.target.value)}
			/>
			<div className="input-group-append">
				<button className="btn btn-primary" type="submit" onClick={search}>
					<i className="fas fa-search"></i>
				</button>
			</div>
		</div>
	);
};
