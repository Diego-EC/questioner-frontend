import React from "react";
import PropTypes from "prop-types";

export const Button = props => {
	Button.propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string,
		onClick: PropTypes.func,
		color: PropTypes.string
	};

	return (
		<div className={"btn btn-" + props.color} type="submit" onClick={props.onClick}>
			{props.label} <span className={props.icon}></span>
		</div>
	);
};

Button.defaultProps = {
	color: "primary"
};
