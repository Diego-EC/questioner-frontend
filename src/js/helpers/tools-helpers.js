export function isAdmin(idRole) {
	const ROLE_ADMIN_ID = 1;

	if (idRole == ROLE_ADMIN_ID) {
		return true;
	} else {
		return false;
	}
}
