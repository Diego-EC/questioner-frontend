import React from "react";
import PropTypes from "prop-types";

export const Button = props => {
	Button.propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string,
		onClick: PropTypes.func,
		color: PropTypes.string,
		isDisabled: PropTypes.bool,
		hasSpinner: PropTypes.bool
	};

	let spinner = "";
	if (props.hasSpinner === true) {
		spinner = "spinner-grow spinner-grow-sm";
	}

	return (
		<div className={"btn btn-" + props.color} type="submit" onClick={props.onClick} disabled={props.isDisabled}>
			<span className={props.icon}></span> <span className={spinner}></span> {props.label}
		</div>
	);
};

Button.defaultProps = {
	color: "primary",
	isDisabled: false,
	hasSpinner: false
};
