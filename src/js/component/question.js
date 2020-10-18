import React from "react";
import { Link } from "react-router-dom";
import { QuestionDetail } from "../views/question-detail";
import PropTypes from "prop-types";
import { BadgeInfo } from "./bootstrap/badge-info";
import { BadgeSuccess } from "./bootstrap/badge-success";

export const Question = props => {
	Question.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		isAnswered: PropTypes.bool,
		numberOfAnswers: PropTypes.number
	};

	let answeredBadgeHtml = () => {
		console.log(props.isAnswered);
		return <BadgeSuccess label={"Answered"} />;
		/*if (props.isAnswered === true) {
			return <BadgeSuccess label={"Answered"} />;
		} else {
			return <div></div>;
		}*/
	};

	return (
		<div className="card mb-3">
			<div className="card-header">
				<div className="row justify-content-end">
					<div className="align-self-center mr-1">
						<BadgeSuccess label={"Answered"} />
					</div>
					<BadgeInfo label={"Answers"} amount={props.numberOfAnswers} />
				</div>
			</div>
			<div className="card-body">
				<Link to={"/question-detail/" + props.id}>
					<h4 className="card-title">{props.title}</h4>
				</Link>
				{/*<p className="card-text">{props.description}</p>*/}
			</div>
		</div>
	);
};
