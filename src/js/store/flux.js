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
				idRole: null,
				isActive: null,
				alertsActivated: null,
				accessToken: null
			}
		},
		actions: {
			getLoggedUserID() {
				console.log("getLoggedUserID");
				const store = getStore();
				let user = this.getLoggedUserData();
				console.log("user");
				console.log(user);
				if (user !== null && user.id) {
					console.log("user.id " + user.id);
					return user.id;
				} else {
					return null;
				}
			},
			getLoggedUserRoleID() {
				console.log("getLoggedUserRoleID");
				const store = getStore();
				let user = this.getLoggedUserData();
				console.log("user");
				console.log(user);
				if (user !== null && user.idRole) {
					console.log("user.idRole " + user.idRole);
					return user.idRole;
				} else {
					return null;
				}
			},
			setLoggedUserData: (loggedUser, accessToken) => {
				let loggedUserParsed = {};
				loggedUserParsed.id = loggedUser.id;
				loggedUserParsed.name = loggedUser.name;
				loggedUserParsed.email = loggedUser.email;
				loggedUserParsed.idRole = loggedUser.id_role;
				loggedUserParsed.isActive = loggedUser.is_active;
				loggedUserParsed.alertsActivated = loggedUser.alerts_activated;
				loggedUserParsed.accessToken = accessToken;
				setStore({ loggedUser: loggedUserParsed });
				localStorage.setItem("loggedUser", loggedUserParsed);
			},
			getLoggedUserData: () => {
				console.log("getLoggedUserData");

				const store = getStore();
				if (store.loggedUser !== null) {
					return store.loggedUser;
				}

				let userInLocalStorage = localStorage.getItem("loggedUser");
				if (userInLocalStorage !== null) {
					getActions().setLoggedUserData(userInLocalStorage);
				}

				return userInLocalStorage;
			},
			setLogoutUser: () => {
				console.log("setLogoutUser");
				let logoutUserParsed = {};
				logoutUserParsed.id = null;
				logoutUserParsed.name = null;
				logoutUserParsed.email = null;
				logoutUserParsed.idRole = null;
				logoutUserParsed.isActive = null;
				logoutUserParsed.alertsActivated = null;
				logoutUserParsed.accessToken = null;
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
