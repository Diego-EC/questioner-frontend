import React from "react";
import PropTypes from "prop-types";

export const ButtonWarning = props => {
	ButtonWarning.propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string
	};

	return (
		<div className="btn btn-warning text-white">
			{props.label}
			<span className={props.icon}></span>
		</div>
	);
};
