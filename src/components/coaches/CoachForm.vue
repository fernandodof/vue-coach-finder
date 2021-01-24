<template>
	<form @submit.prevent="submit">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="firstName">First name</label>
			<input type="text" id="firstName" v-model.trim="firstName.value" @blur="clearFiledValidtion('firstName')" />
			<p v-if="!firstName.isValid">First name must not be empty</p>
		</div>
		<div class="form-control" :class="{ invalid: !lastName.isValid }">
			<label for="lastName">Last name</label>
			<input type="text" id="lastName" v-model.trim="lastName.value" @blur="clearFiledValidtion('lastName')" />
			<p v-if="!lastName.isValid">Last name must not be empty</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea id="description" rows="5" v-model.trim="description.value" @blur="clearFiledValidtion('description')"></textarea>
			<p v-if="!description.isValid">Description name must not be empty</p>
		</div>
		<div class="form-control" :class="{ invalid: !rate.isValid }">
			<label for="rate">Hourly Rate</label>
			<input type="number" id="rate" v-model.number="rate.value" @blur="clearFiledValidtion('rate')" />
			<p v-if="!rate.isValid">Rate must be greater than 0</p>
		</div>
		<div class="form-control" :class="{ invalid: !areas.isValid }">
			<h3>Areas of Expertise</h3>
			<div>
				<input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @blur="clearFiledValidtion('areas')" />
				<label for="frontend">Frontend Development</label>
			</div>
			<div>
				<input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="clearFiledValidtion('areas')" />
				<label for="backend">Backend Development</label>
			</div>
			<div>
				<input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearFiledValidtion('areas')" />
				<label for="career">Career Advisory</label>
			</div>
			<p v-if="!areas.isValid">Select at least one area of expertise</p>
		</div>

		<p v-if="!formIsValid">Please fix the above errors and submit again</p>
		<base-button>Register</base-button>
		<!-- <base-button :disabled="!formIsValid">Register</base-button> -->
	</form>
</template>

<script>
export default {
	emits: ['submit'],
	data() {
		return {
			firstName: {
				value: null,
				isValid: true
			},
			lastName: {
				value: null,
				isValid: true
			},
			description: {
				value: null,
				isValid: true
			},
			rate: {
				value: null,
				isValid: true
			},
			areas: {
				value: [],
				isValid: true
			},
			formIsValid: true
		};
	},
	methods: {
		validateForm() {
			this.formIsValid = true;

			if (!this.firstName.value) {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (!this.lastName.value) {
				this.lastName.isValid = false;
				this.formIsValid = false;
			}
			if (!this.description.value) {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (!this.rate.value || this.rate.value < 0) {
				this.rate.isValid = false;
				this.formIsValid = false;
			}
			if (!this.areas.value.length) {
				this.areas.isValid = false;
				this.formIsValid = false;
			}
		},
		clearFiledValidtion(input) {
			this[input].isValid = true;
		},
		submit() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			const formData = {
				firstName: this.firstName.value,
				lastName: this.lastName.value,
				description: this.description.value,
				rate: this.rate.value,
				areas: this.areas.value
			};
			this.$emit('submit', formData);
		}
	}
};
</script>

<style lang="scss" scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;

	&:focus,
	&:focus {
		background-color: #f0e6fd;
		outline: none;
		border-color: #3d008d;
	}
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;

	&:focus {
		outline: #3d008d solid 1px;
	}
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid {
	label {
		color: red;
	}

	input,
	textarea {
		border: 1px solid red;
	}
}
</style>
