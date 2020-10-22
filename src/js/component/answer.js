import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../component/bootstrap/button";
import { Modal } from "../component/bootstrap/modal";
import { Context } from "../store/app-context";

export const Answer = props => {
	Answer.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string
	};
	let { id } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [answer, setAnswer] = useState({});

	function answerDeletedOK() {
		$("#answerDeletedOK").modal({ show: true, keyboard: false, backdrop: "static" });
	}

	function deleteAnswer() {
		history.push(`/question-detail/${id}`);
	}

	function closeModal() {
		history.push(`/question-detail/${id}`);
	}

	return (
		<div className="card mb-3">
			<div className="card-header">
				<div className="d-flex justify-content-end">
					<div className="">
						<Button label={"Choose as Best Answer"} color={"primary"} />
					</div>
					<div className="ml-1">
						<Link to={id + "/edit-answer"}>
							<Button label={"Edit answer"} color={"primary"} />
						</Link>
					</div>
					<div className="ml-1">
						<Button label={"Delete answer"} color={"danger"} onClick={answerDeletedOK} />
						<Modal
							id={"answerDeletedOK"}
							title={"Are you sure you want to delete the answer?"}
							text={"The data will be lost forever."}
							okCallbackFunction={deleteAnswer}
							cancelCallbackFunction={closeModal}
							labelOK="OK"
							labelCancel="Cancel"
						/>
					</div>
				</div>
			</div>
			<div className="card-body">
				<h4 className="card-title">{props.title}</h4>
				<p className="card-text">{props.description}</p>
			</div>
		</div>
	);
};
