import React from "react";
import PropTypes from "prop-types";

export const BadgeSuccess = props => {
	BadgeSuccess.propTypes = {
		label: PropTypes.string
	};

	return (
		<div>
			<span className="badge badge-success">{props.label}</span>
		</div>
	);
};
