import React from "react";
import { Link } from "react-router-dom";
import { QuestionDetail } from "../views/question-detail";
import PropTypes from "prop-types";

export const Question = props => {
	Question.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string
	};

	return (
		<div className="card mb-3">
			<div className="card-header">Question</div>
			<div className="card-body">
				<Link to={"/question-detail/" + props.id}>
					<h4 className="card-title">{props.title}</h4>
				</Link>
				<p className="card-text">{props.description}</p>
				{/*<a href="#" className="card-link">
					Card link
				</a>
				<a href="#" className="card-link">
					Another link
    </a>*/}
			</div>
		</div>
	);
};
