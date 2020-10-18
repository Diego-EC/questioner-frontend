import React, { useEffect } from "react";
import PropTypes from "prop-types";

export const Switches = props => {
	Switches.propTypes = {
		label: PropTypes.string,
		idUser: PropTypes.string
	};

	return (
		<div className="custom-control custom-switch">
			<input type="checkbox" className="custom-control-input" id={props.idUser} />
			<label className="custom-control-label" htmlFor={props.idUser}>
				{props.label}
			</label>
		</div>
	);
};

Switches.defaultProps = {
	label: "Toggle this switch element"
};
