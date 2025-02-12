<template>
	<div>
		<base-dialog :show="!!error" title="Authenticating..." @close="onCloseError">
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog fixed :show="isLoading" title="Authenticating...">
			<base-spinner></base-spinner>
		</base-dialog>
		<form @submit.prevent="submitForm">
			<base-card>
				<div class="form-control">
					<label for="emai">Email</label>
					<input type="email" id="email" v-model.trim="email" />
				</div>
				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" v-model.trim="password" />
				</div>
				<p v-if="!formIsValid">Please enter a valid email and password (must contain at least 6 characters).</p>
				<base-button>{{ mode }}</base-button>
				<base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonLabel }}</base-button>
			</base-card>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: null,
			password: null,
			formIsValid: true,
			mode: 'Login',
			isLoading: false,
			error: null
		};
	},
	methods: {
		async submitForm() {
			if (!this.email || !this.email.includes('@') || this.password.length < 6) {
				this.formIsValid = false;
				return;
			}

			this.isLoading = true;

			const actionPayload = {
				email: this.email,
				password: this.password
			};

			try {
				if (this.mode === 'Login') {
					await this.$store.dispatch('login', actionPayload);
				} else {
					await this.$store.dispatch('signup', actionPayload);
				}
				const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`;
				this.$router.replace(redirectUrl);
			} catch (err) {
				this.error = err.message;
				this.isLoading = false;
			}

			this.isLoading = false;
		},
		switchAuthMode() {
			this.mode = this.mode === 'Login' ? 'Signup' : 'Login';
		},
		onCloseError() {
			this.error = null;
		}
	},
	computed: {
		switchModeButtonLabel() {
			return this.mode === 'Login' ? 'Signup instead' : 'Login instead';
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	margin: 1rem;
	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;

	:focus {
		border-color: #3d008d;
		background-color: #faf6ff;
		outline: none;
	}
}
</style>
