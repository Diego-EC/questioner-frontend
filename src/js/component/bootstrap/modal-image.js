import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

export const ModalImage = props => {
	ModalImage.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.object,
		okCallbackFunction: PropTypes.func,
		cancelCallbackFunction: PropTypes.func,
		labelOK: PropTypes.string,
		labelCancel: PropTypes.string,
		size: PropTypes.string
	};

	let confirmModal = "";
	if (props.labelOK) {
		confirmModal = (
			<button
				type="button"
				className="btn btn-outline-primary"
				data-dismiss="modal"
				onClick={props.okCallbackFunction}>
				{props.labelOK}
			</button>
		);
	}

	return (
		<div className="modal fade" id={props.id} role="dialog">
			<div className={"modal-dialog modal-xl"}>
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">{props.title}</h4>
					</div>
					<div className="modal-body text-center">
						<p>{props.text}</p>
					</div>
					<div className="modal-footer">
						{confirmModal}
						<button
							type="button"
							className="btn btn-outline-secondary"
							data-dismiss="modal"
							onClick={props.cancelCallbackFunction}>
							{props.labelCancel}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

ModalImage.defaultProps = {
	labelCancel: "Close"
};
