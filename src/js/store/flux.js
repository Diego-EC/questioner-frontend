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
			},
			setLogoutUser: () => {
				let logoutUserParsed = {};
				logoutUserParsed.id = null;
				logoutUserParsed.name = null;
				logoutUserParsed.email = null;
				logoutUserParsed.idRole = null;
				logoutUserParsed.isActive = null;
				logoutUserParsed.alertsActivated = null;
				logoutUserParsed.accessToken = null;
				setStore({ loggedUser: logoutUserParsed });
			}
			// TODO: añadir validación en los endpoints:
			// - @jwt_required --> en backend
			// const headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
		}
	};
};

export default getState;
