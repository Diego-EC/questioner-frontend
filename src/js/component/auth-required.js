import React, { useEffect, useState, useContext, Fragment } from "react";
import { useHistory, Route } from "react-router-dom";
import { Context } from "../store/app-context";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

import { Questions } from "../views/questions";
import { QuestionDetail } from "../views/question-detail";
import { ManageUsers } from "../views/manage-users";
import { AddQuestion } from "../views/add-question";
import { AddAnwser } from "../views/add-answer";
import { EditQuestion } from "../views/edit-question";
import { EditAnswer } from "../views/edit-answer";

export const AuthRequired = () => {
	const REDIRECT_TO_IF_NOT_AUTHORIZED = "/";
	const CHECK_PROTECTED_ENDPOINT = "check-protected";
	const { store, actions } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	/*if (localStorage.getItem("accessToken") == null) {
		history.push(REDIRECT_TO_IF_NOT_AUTHORIZED);
	}*/

	useEffect(() => {
		init();
	}, []);

	async function init() {
		let responseJson = await doPostFetch(Constant.BACKEND_ROOT + CHECK_PROTECTED_ENDPOINT);
		if (responseJson !== undefined && responseJson.status !== undefined && responseJson.status === "OK") {
			setLoading(false);
		} else {
			history.push(REDIRECT_TO_IF_NOT_AUTHORIZED);
		}
	}

	if (loading == true) {
		return "Loading...";
	}

	return (
		<Fragment>
			<Route exact path="/questions" component={Questions} />
			<Route exact path="/question-detail/:id" component={QuestionDetail} />
			<Route exact path="/manage-users" component={ManageUsers} />
			<Route exact path="/add-question" component={AddQuestion} />
			<Route exact path="/question-detail/:id/add-answer" component={AddAnwser} />
			<Route exact path="/question-detail/:id/edit-question" component={EditQuestion} />
			<Route exact path="/question-detail/:idQuestion/edit-answer/:idAnswer" component={EditAnswer} />
		</Fragment>
	);
};
