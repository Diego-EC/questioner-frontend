import React from "react";
import PropTypes from "prop-types";

export const ButtonPrimary = props => {
	ButtonPrimary.propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string
	};

	return (
		<div className="btn btn-primary">
			{props.label}
			<span className={props.icon}></span>
		</div>
	);
};
