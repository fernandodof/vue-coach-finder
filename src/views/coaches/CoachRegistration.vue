<template>
	<section>
		<base-card>
			<h2>Register as a coach now!</h2>
			<coach-form @submit="saveFormData"></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
	components: {
		CoachForm
	},
	methods: {
		saveFormData(formData) {
			this.$store.dispatch('coaches/register', formData);
			this.$router.replace('/coaches');
		}
	}
};
</script>

<style lang="scss" scoped></style>
