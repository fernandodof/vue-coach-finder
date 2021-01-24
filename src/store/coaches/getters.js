export default {
	coaches(state) {
		return state.coaches;
	},
	hasCoaches(state) {
		return !!state.coaches?.length;
	},
	getCoach: state => id => {
		return state.coaches.find(coach => coach.id === id);
	},
	isCoach(state, getters, rootState, rootGetters) {
		const coaches = getters.coaches;
		const userId = rootGetters.userId;

		return coaches.some(coach => coach.id === userId);
	},
	shouldUpdate(state) {
		const lastFetch = state.lastFetch;

		if (!lastFetch) {
			return true;
		}

		const currentTimeStamp = new Date().getTime();

		// check if difference is greater than one minute
		return (currentTimeStamp - lastFetch) / 1000 > 60;
	}
};
