export default {
	setUser(state, payload) {
		state.token = payload.idToken || payload.token;
		state.userId = payload.localId || payload.userId;
		state.didAutoLogout = false;
	},
	setAutoLogout(state) {
		state.didAutoLogout = true;
	}
};
