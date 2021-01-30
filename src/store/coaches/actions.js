export default {
	async register(context, payload) {
		const id = context.rootGetters.userId;
		const token = context.rootGetters.token;

		const response = await fetch(`https://vue-http-3eb7f-default-rtdb.firebaseio.com/coaches/${id}.json?auth=${token}`, {
			method: 'PUT',
			body: JSON.stringify(payload)
		});

		// const responseData = await response.json();

		if (!response.ok) {
			// err
		}

		context.commit('register', { ...payload, id });
	},
	async loadCoaches(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}

		const response = await fetch('https://vue-http-3eb7f-default-rtdb.firebaseio.com/coaches.json');

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const coaches = [];

		for (const key in responseData) {
			const coach = { ...responseData[key], id: key };
			coaches.push(coach);
		}

		context.commit('setCoaches', coaches);
		context.commit('setFetchTimeStamp');
	}
};
