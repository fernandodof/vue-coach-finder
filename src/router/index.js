import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from '../views/coaches/CoachesList';
import CoachDetail from '../views/coaches/CoachDetail';
import CoachRegistration from '../views/coaches/CoachRegistration';
import ContactCoach from '../views/requests/ContactCoach';
import RequestsReceived from '../views/requests/RequestsReceived';
import NotFound from '../views/NotFound';
import UserAuth from '../views/auth/UserAuth';
import store from '../store/index';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/coaches' },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id',
			component: CoachDetail,
			props: true,
			children: [{ path: 'contact', component: ContactCoach }]
		},
		{ path: '/register', component: CoachRegistration, meta: { requresAuth: true } },
		{ path: '/requests', component: RequestsReceived, meta: { requresAuth: true } },
		{ path: '/:notFound(.*)', component: NotFound, meta: { requresUnauth: true } },
		{ path: '/auth', component: UserAuth }
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requresAuth && !store.getters.isAuthenticated) {
		next('/auth');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/coaches');
	} else {
		next(true);
	}
});

export default router;
