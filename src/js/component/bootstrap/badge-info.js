import React from "react";
import PropTypes from "prop-types";

export const BadgeInfo = props => {
	BadgeInfo.propTypes = {
		label: PropTypes.string,
		amount: PropTypes.number
	};

	return (
		<span className={"btn btn-q-badge q-badge rounded"}>
			{props.label} <span className="badge badge-dark">{props.amount}</span>
		</span>
	);
};
