import React from "react";
import { Link } from "react-router-dom";
import { QuestionDetail } from "../views/question-detail";
import PropTypes from "prop-types";
import { BadgeInfo } from "./bootstrap/badge-info";

export const Question = props => {
	Question.propTypes = {
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		idAnswerSelected: PropTypes.number,
		numberOfAnswers: PropTypes.number
	};

	let buttonSolvedHTML = "";
	let borderHighlightHTML = "";
	let textHighlightHTML = "";
	if (props.idAnswerSelected !== null) {
		buttonSolvedHTML = <BadgeInfo label={"Solved"} color={"success"} />;
		borderHighlightHTML = " border-success";
		textHighlightHTML = " text-success";
	}

	return (
		<div className={"card mb-3" + borderHighlightHTML}>
			<div className={"card-header" + borderHighlightHTML}>
				<div className="row justify-content-end">
					{buttonSolvedHTML}
					<BadgeInfo label={"Answers"} amount={props.numberOfAnswers} color={"info"} />
				</div>
			</div>
			<div className="card-body">
				<Link to={"/question-detail/" + props.id}>
					<h4 className={"card-title" + textHighlightHTML}>{props.title}</h4>
				</Link>
			</div>
		</div>
	);
};
