import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../component/bootstrap/button";

export const Answer = props => {
	Answer.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		isAnswered: PropTypes.bool,
		numberOfAnswers: PropTypes.number
	};

	return (
		<div className="card mb-3">
			<div className="card-header">
				<div className="row justify-content-end">
					<Button label={"Choose as Best Answer"} color={"primary"} />
				</div>
			</div>
			<div className="card-body">
				<h4 className="card-title">{props.title}</h4>
				<p className="card-text">{props.description}</p>
			</div>
		</div>
	);
};
