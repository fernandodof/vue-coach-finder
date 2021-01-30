import { createStore } from 'vuex';

import coachesModules from './coaches/index';
import requestsModule from './requests/index';
import authModule from './auth/index';

export default createStore({
	mutations: {},
	actions: {},
	modules: {
		coaches: coachesModules,
		requests: requestsModule,
		authModule
	}
});
