import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { doPutFetch } from "../../helpers/fetch-helper";
import * as Constant from "../../helpers/constants";

export const Switches = props => {
	Switches.propTypes = {
		label: PropTypes.string,
		idUser: PropTypes.number,
		isActive: PropTypes.bool
	};
	const USER_IS_ACTIVE_ENDPOINT = "user-is-active";

	async function toggleIsActiveValue(checked) {
		console.log(checked);

		let data = {
			id_user: props.idUser,
			is_active: checked
		};
		const json = await doPutFetch(Constant.BACKEND_ROOT + USER_IS_ACTIVE_ENDPOINT, data);
	}

	let checkedHTML = false;
	if (props.isActive == true) {
		checkedHTML = true;
	}

	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="checkbox"
				value=""
				id="defaultCheck1"
				onClick={event => toggleIsActiveValue(event.target.checked)}
				defaultChecked={checkedHTML}></input>
		</div>
	);
};

Switches.defaultProps = {
	label: "Toggle this switch element"
};
