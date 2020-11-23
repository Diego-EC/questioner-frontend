import React from "react";
import { Link } from "react-router-dom";
import { QuestionDetail } from "../views/question-detail";
import PropTypes from "prop-types";
import { BadgeInfo } from "./bootstrap/badge-info";
import { BadgeSolved } from "./bootstrap/badge-solved";

export const Question = props => {
	Question.propTypes = {
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		idAnswerSelected: PropTypes.number,
		numberOfAnswers: PropTypes.number,
		userName: PropTypes.string,
		date: PropTypes.string
	};

	let badgeSolvedHTML = "";
	let borderHighlightHTML = "";
	let textHighlightHTML = "";
	if (props.idAnswerSelected !== null) {
		badgeSolvedHTML = <BadgeSolved />;
		borderHighlightHTML = " border-success";
		textHighlightHTML = " text-success";
	}

	return (
		<div className={"card mb-4 shadow-sm"}>
			<div className={"card-header bg-transparent border-bottom-0"}>
				<div className="row justify-content-between mx-0 pt-2">
					<div className="">
						<span className="text-q-default">
							By: <b>{props.userName}</b>
						</span>
					</div>
					<div className="d-flex align-items-center">
						<div className="mr-3">{badgeSolvedHTML}</div>
						<div>
							<BadgeInfo label={"Answers"} amount={props.numberOfAnswers} />
						</div>
					</div>
				</div>
			</div>
			<div className="card-body">
				<Link to={"/question-detail/" + props.id}>
					<h4 className={"card-title"}>{props.title}</h4>
				</Link>
			</div>
		</div>
	);
};
