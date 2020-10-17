import React from "react";
import PropTypes from "prop-types";

export const ButtonSecondary = props => {
	ButtonSecondary.propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string
	};

	return (
		<div className="btn btn-secondary">
			{props.label}
			<span className={props.icon}></span>
		</div>
	);
};
