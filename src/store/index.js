import { createStore } from 'vuex';

import coachesModules from './coaches/index';
import requestsModule from './requests/index';

export default createStore({
	state: {
		userId: 'c3'
	},
	mutations: {},
	actions: {},
	getters: {
		userId(state) {
			return state.userId;
		}
	},
	modules: {
		coaches: coachesModules,
		requests: requestsModule
	}
});
