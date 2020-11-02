const getState = ({ getStore, getActions, setStore }) => {
	const DEV_ROOT = "https://3000-f4686e89-3f28-4d9f-b041-346f4456ba04.ws-eu01.gitpod.io/";
	const BACKEND_ROOT = "https://questioner-back.herokuapp.com/";
	const LOGIN_ENDPOINT = "login";
	const CHECK_PROTECTED_ENDPOINT = "check-protected";
	const LOGOUT_ENDPOINT = "logout";
	const QUESTIONS_ENDPOINT = "questions";
	const QUESTION_ENDPOINT = "question";
	const ANSWERS_BY_QUESTION_ID_ENDPOINT = "answers-by-question-id";
	const ANSWER_ENDPOINT = "answer";
	const USERS_ENDPOINT = "users";

	// Si aglo está en el flux (datos, array, ...) solo debe estar en el flux.
	// Por ejemplo, datos que van a ser usados en varias vistas.
	// Y solo methods que manejan esos datos. Ojo, doFetch si porque es llamado desde
	// varios sitios.
	return {
		store: {
			loggedUser: {
				id: null,
				name: null,
				email: null,
				idRole: null,
				isActive: null,
				alertsActivated: null,
				token: null
			}
		},
		actions: {
			setLoggedUserData: (loggedUser, token) => {
				let loggedUserParsed = {};
				loggedUserParsed.id = loggedUser.id;
				loggedUserParsed.name = loggedUser.name;
				loggedUserParsed.email = loggedUser.email;
				loggedUserParsed.idRole = loggedUser.id_role;
				loggedUserParsed.isActive = loggedUser.is_active;
				loggedUserParsed.alertsActivated = loggedUser.alerts_activated;
				loggedUserParsed.token = token;
				setStore({ loggedUser: loggedUserParsed });
			},
			setLogoutUser: () => {
				console.log("LOL");
				let logoutUserParsed = {};
				logoutUserParsed.id = null;
				logoutUserParsed.name = null;
				logoutUserParsed.email = null;
				logoutUserParsed.idRole = null;
				logoutUserParsed.isActive = null;
				logoutUserParsed.alertsActivated = null;
				logoutUserParsed.token = null;
				setStore({ loggedUser: logoutUserParsed });
			},
			// TODO: añadir validación en los endpoints:
			// - @jwt_required --> en backend
			// const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
			fetchLogin: async data => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + LOGIN_ENDPOINT, "POST", headers, data);

				if (json) {
					return json;
				}
			},
			fetchCheckProtected: async () => {
				const accessToken = localStorage.getItem("accessToken");
				const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
				let json = await getActions().doFetch(BACKEND_ROOT + CHECK_PROTECTED_ENDPOINT, "POST", headers);

				if (json) {
					return json;
				}
			},
			fetchLogout: async () => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + LOGOUT_ENDPOINT, "POST", headers);

				if (json) {
					return json;
				}
			},
			doFetch: (endpoint, method, headers, data) => {
				/*let tempHeaders;
				if (headers == null) {
					tempHeaders = { "Content-Type": "application/json" };
				} else {
					tempHeaders = { "Content-Type": "application/json", headers };
				}*/

				let fetchOptions = {
					method: method,
					headers: headers,
					body: JSON.stringify(data)
				};
				// TODOs: header application/json aquí y body condicionarlo también a si
				// le paso algo en data.
				console.log("fetch");
				console.log(endpoint);
				console.log(fetchOptions);
				return fetch(endpoint, fetchOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw Error(response.status);
						}
					})
					.catch(error => {
						alert(error);
						return null;
					});
			},
			fetchGetQuestons: async () => {
				const headers = { "Content-Type": "application/json" };
				let json = await getActions().doFetch(BACKEND_ROOT + QUESTIONS_ENDPOINT, "GET", headers);
				if (json) {
					return json;
				}
			},
			fetchGetQuestionById: async id => {
				const headers = { "Content-Type": "application/json" };
				const data = {
					id: id
				};
				let json = await getActions().doFetch(BACKEND_ROOT + QUESTION_ENDPOINT + "/" + id, "GET");
				if (json) {
					return json;
				}
			},
			fetchGetAnswerById: async id => {
				const headers = { "Content-Type": "application/json" };
				const data = {
					id: id
				};
				let json = await getActions().doFetch(BACKEND_ROOT + ANSWER_ENDPOINT + "/" + id, "GET");
				if (json) {
					return json;
				}
			},
			fetchGetAnswersByQuestionId: async id => {
				const headers = { "Content-Type": "application/json" };
				const data = {
					id: id
				};
				let json = await getActions().doFetch(BACKEND_ROOT + ANSWERS_BY_QUESTION_ID_ENDPOINT + "/" + id, "GET");
				if (json) {
					return json;
				}
			},
			fetchGetUsers: async () => {
				let json = await getActions().doFetch(BACKEND_ROOT + USERS_ENDPOINT, "GET");
				if (json) {
					return json;
				}
			}
		}
	};
};

export default getState;
