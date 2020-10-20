import React from "react";
import PropTypes from "prop-types";
// badge-dinamic-label-amount-color
export const BadgeInfo = props => {
	BadgeInfo.propTypes = {
		label: PropTypes.string,
		amount: PropTypes.number,
		color: PropTypes.string
	};

	return (
		<span className={"ml-1 text-white p-1 rounded bg-" + props.color}>
			{props.label} <span className="badge badge-light">{props.amount}</span>
		</span>
	);
};

BadgeInfo.defaultProps = {
	color: "primary"
};
