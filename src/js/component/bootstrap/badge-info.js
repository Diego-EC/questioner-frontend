import React from "react";
import PropTypes from "prop-types";

export const BadgeInfo = props => {
	BadgeInfo.propTypes = {
		label: PropTypes.string,
		amount: PropTypes.number
	};

	return (
		<button type="buton" className="btn btn-info" disabled>
			{props.label} <span className="badge badge-light">{props.amount}</span>
		</button>
	);
};
