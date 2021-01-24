export default {
	async contactCoach(context, payload) {
		const newRequest = {
			coachId: payload.coachId,
			userEmail: payload.email,
			message: payload.message
		};

		const response = await fetch(`https://vue-http-3eb7f-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
			method: 'POST',
			body: JSON.stringify(newRequest)
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		newRequest.id = responseData.name;
		newRequest.coachId = payload.coachId;

		context.commit('addRequest', newRequest);
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId;
		const response = await fetch(`https://vue-http-3eb7f-default-rtdb.firebaseio.com/requests/${coachId}.json`);

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const requests = [];

		for (const id in responseData) {
			const request = { ...responseData[id], id, coachId };
			requests.push(request);
		}

		context.commit('setRequests', requests);
	}
};
