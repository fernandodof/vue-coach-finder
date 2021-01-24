<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !email.isValid }">
			<label for="email">Your Email</label>
			<input type="email" id="email" v-model.trim="email.value" @blur="clearFiledValidtion('email')" />
			<p v-if="!email.isValid">Please enter a valid email</p>
		</div>
		<div class="form-control" :class="{ invalid: !message.isValid }">
			<label for="message">Message</label>
			<textarea id="message" rows="5" v-model.trim="message.value" @blur="clearFiledValidtion('message')"></textarea>
			<p v-if="!message.isValid">Message must not be empty</p>
		</div>
		<p class="errors" v-if="!formIsValid">Please fix form errors and submit again</p>
		<div class="actions">
			<base-button>Send Message</base-button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: {
				value: null,
				isValid: true
			},
			message: {
				value: null,
				isValid: true
			},
			formIsValid: true
		};
	},
	methods: {
		clearFiledValidtion(input) {
			this[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;

			if (!this.email.value || !this.email.value.includes('@')) {
				this.email.isValid = false;
				this.formIsValid = false;
			}

			if (!this.message.value) {
				this.message.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			this.$store.dispatch('requests/contactCoach', {
				coachId: this.$route.params.id,
				email: this.email.value,
				message: this.message.value
			});

			this.$router.replace('/coaches');
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	margin: 1rem;
	border: 1px solid #ccc;
	border-radius: 12px;
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

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}

.invalid {
	label,
	p {
		color: red;
	}

	input,
	textarea {
		border: 1px solid red;
	}
}
</style>
