let expirerTimer;

export default {
	async login(context, payload) {
		return context.dispatch('auth', {
			...payload,
			authMode: AuthMode.LOGIN
		});
	},
	async signup(context, payload) {
		return context.dispatch('auth', {
			...payload,
			authMode: AuthMode.SIGNUP
		});
	},
	async auth(context, payload) {
		const authAction = payload.authMode;
		let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu9laZsXdSOzS4-UyU-nHu7sj8dIb76vU';
		if (authAction === AuthMode.SIGNUP) {
			authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu9laZsXdSOzS4-UyU-nHu7sj8dIb76vU';
		}

		const response = await fetch(authUrl, {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true
			})
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || 'Failed to authenticate');
		}

		const expiresIn = +responseData.expiresIn * 1000;
		// const expiresIn = 5000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('expiresIn', expirationDate);

		expirerTimer = setTimeout(() => {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', responseData);
	},
	tryLogin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const expiresIn = localStorage.getItem('expiresIn');

		if (+expiresIn - new Date().getTime()) {
			return;
		}

		expirerTimer = setTimeout(() => {
			context.dispatch('autoLogout');
		}, expiresIn);

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId
			});
		}
	},
	logout(context) {
		context.commit('setUser', {
			token: null,
			userId: null
		});

		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expiresIn');

		clearTimeout(expirerTimer);
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	}
};

const AuthMode = {
	LOGIN: 'LOGIN',
	SIGNUP: 'SIGNUP'
};
