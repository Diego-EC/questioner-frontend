import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

export const Modal = props => {
	Modal.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.string,
		close: PropTypes.func
	};

	return (
		<div className="modal fade" id={props.id} role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">{props.title}</h4>
						<button type="button" className="close" data-dismiss="modal">
							&times;
						</button>
					</div>
					<div className="modal-body text-left">
						<p>{props.text}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							data-dismiss="modal"
							onClick={props.close}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
