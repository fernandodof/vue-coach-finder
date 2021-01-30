<template>
	<div>
		<div v-if="selectedCoach">
			<section>
				<base-card>
					<h2>{{ fullName }}</h2>
					<h3>${{ selectedCoach.rate }}/hour</h3>
				</base-card>
			</section>
			<section>
				<base-card>
					<base-button link mode="outline" v-if="contactLink" :to="contactLink">Contact</base-button>
					<header>
						<h2>Interested? Reach out now!</h2>
					</header>
					<router-view></router-view>
				</base-card>
			</section>
			<section>
				<base-card>
					<base-badge v-for="area in selectedCoach.areas" :key="area" :type="area">{{ area }}</base-badge>
					<p>{{ selectedCoach.description }}</p>
				</base-card>
			</section>
		</div>
		<div v-else>
			<h2>This coach doesn't exist</h2>
		</div>
	</div>
</template>

<script>
export default {
	props: ['id'],
	computed: {
		selectedCoach() {
			return this.$store.getters['coaches/getCoach'](this.id);
		},
		fullName() {
			return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
		},
		contactLink() {
			return this.$route.path.includes('contact') ? '' : `${this.$route.path}/contact`;
		}
	}
};
</script>
