import React, { useState, useContext, useEffect } from "react";
import { Question } from "../component/question";
import { Context } from "../store/app-context";

export const Questions = () => {
	const [loading, setLoading] = useState(true);
	const { store, actions } = useContext(Context);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		useEffectAsync();
	}, []);

	async function useEffectAsync() {
		await checkProtected();
		const allQuestions = await getAllQuestions();
		console.log(allQuestions);
		const questionsMap = mapQuestions(allQuestions);
		setQuestions(questionsMap);
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

	function getAllQuestions() {
		//return actions.getAllQuestions();
		return actions.fetchGetQuestons();
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

	if (loading == true) {
		return "Loading...";
	}

	return (
		<div className="container">
			<div className="container">{questions}</div>
		</div>
	);
};
