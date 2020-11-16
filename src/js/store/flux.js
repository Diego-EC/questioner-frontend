const getState = ({ getStore, getActions, setStore }) => {
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
				id_role: null,
				is_active: null,
				alerts_activated: null,
				access_token: null
			},
			questions: [],
			searchText: ""
		},
		actions: {
			setQuestions(questions) {
				setStore({ questions: questions });
			},
			getQuestions() {
				const store = getStore();
				if (store.questions) {
					return store.questions;
				} else {
					return null;
				}
			},
			setSearchText(searchText) {
				setStore({ searchText: searchText });
			},
			getSearchText() {
				const store = getStore();
				if (store.searchText) {
					return store.searchText;
				} else {
					return null;
				}
			},
			getLoggedUserID() {
				let user = this.getLoggedUserData();
				if (user !== null && user.id) {
					return user.id;
				} else {
					return null;
				}
			},
			getLoggedUserRoleID() {
				let user = this.getLoggedUserData();
				if (user !== null && user.id_role) {
					return user.id_role;
				} else {
					return null;
				}
			},
			setLoggedUserData: (loggedUser, accessToken) => {
				let loggedUserParsed = {};
				loggedUserParsed = loggedUser;
				loggedUserParsed.access_token = accessToken;
				setStore({ loggedUser: loggedUserParsed });
				localStorage.setItem("loggedUser", JSON.stringify(loggedUserParsed));
			},
			getLoggedUserData: () => {
				const store = getStore();
				if (store.loggedUser.id !== null) {
					return store.loggedUser;
				}

				let userInLocalStorage = localStorage.getItem("loggedUser");
				let userInLocalStorageParsed = JSON.parse(userInLocalStorage);
				if (userInLocalStorageParsed !== null) {
					getActions().setLoggedUserData(userInLocalStorageParsed);
				}

				return userInLocalStorageParsed;
			},
			setLogoutUser: () => {
				let logoutUserParsed = {};
				logoutUserParsed.id = null;
				logoutUserParsed.name = null;
				logoutUserParsed.email = null;
				logoutUserParsed.id_role = null;
				logoutUserParsed.is_active = null;
				logoutUserParsed.alerts_activated = null;
				logoutUserParsed.access_token = null;
				setStore({ loggedUser: logoutUserParsed });
				localStorage.removeItem("loggedUser");
			}
			// TODO: añadir validación en los endpoints:
			// - @jwt_required --> en backend
			// const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
		}
	};
};

export default getState;
