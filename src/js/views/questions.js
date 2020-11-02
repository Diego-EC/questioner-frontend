import React, { useState, useContext, useEffect } from "react";
import { Question } from "../component/question";
import { Context } from "../store/app-context";
import { doPostFetch, doGetFetch } from "../helpers/fetch-helper";

export const Questions = () => {
	//const [loading, setLoading] = useState(true);
	const { store, actions } = useContext(Context);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		init();
	}, []);

	async function init() {
		const questions = await actions.fetchGetQuestons();
		const questionsMap = mapQuestions(questions);
		console.log(questionsMap);
		console.log("questionsMap");
		setQuestions(questionsMap);
	}

	/*async function checkProtected() {
		let responseJson = await actions.fetchCheckProtected();
		if (responseJson.status !== undefined && responseJson.status === "OK") {
			alert("Usuario correcto");
			setLoading(false);
		} else {
			alert("Usuario no existe");
			history.push("/");
		}
	}*/

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
						isAnswered={question.isAnswered}
						numberOfAnswers={question.numberOfAnswers}
					/>
				);
			});
		}
		return questionsMap;
	}

	/*if (loading == true) {
		return "Loading...";
	}*/

	return (
		<div className="container">
			<div className="container">{questions}</div>
		</div>
	);
};
