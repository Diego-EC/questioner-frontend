import * as Constant from "../helpers/constants";

export function isAdmin(idRole) {
	if (idRole == Constant.ROLE_ADMIN_ID) {
		return true;
	} else {
		return false;
	}
}
