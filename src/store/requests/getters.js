export default {
	requests(state, getters, rootState, rootGetters) {
		const coachId = rootGetters.userId;
		return state.requests.filter(request => request.coachId === coachId);
	},
	hasRequests(state, getters) {
		return !!getters.requests.length;
	}
};
