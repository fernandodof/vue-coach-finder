<template>
	<div>
		<base-dialog :show="!!error" title="An error ocurrend" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter="setFilters"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
					<base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register</base-button>
					<base-button v-if="shouldShowRegisterButton" link to="/register">Register as a coach</base-button>
				</div>

				<base-spinner v-if="isLoading"></base-spinner>

				<ul v-else-if="hasCoaches">
					<coach-item
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:firstName="coach.firstName"
						:lastName="coach.lastName"
						:rate="coach.rate"
						:areas="coach.areas"
					>
					</coach-item>
				</ul>
				<h3 v-else>No coaches found</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseButton from '../../components/ui/BaseButton.vue';

export default {
	components: {
		CoachItem,
		CoachFilter,
		BaseButton
	},
	data() {
		return {
			isLoading: false,
			error: null,
			filters: {
				frontend: true,
				backend: true,
				carrer: true
			},
			currentPage: 1
		};
	},
	computed: {
		filteredCoaches() {
			const coaches = this.$store.getters['coaches/coaches'];

			return coaches.filter(coach => {
				if (this.filters.frontend && coach.areas.includes('frontend')) {
					return true;
				}
				if (this.filters.backend && coach.areas.includes('backend')) {
					return true;
				}
				if (this.filters.carrer && coach.areas.includes('carrer')) {
					return true;
				}
				return false;
			});
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters['coaches/hasCoaches'] && this.filteredCoaches.length;
		},
		isCoach() {
			return this.$store.getters['coaches/isCoach'];
		},
		isLoggedIn() {
			return this.$store.getters['isAuthenticated'];
		},
		shouldShowRegisterButton() {
			return this.isLoggedIn && !this.isLoading && !this.isCoach;
		}
	},
	methods: {
		onPageChange(page) {
			this.currentPage = page;
		},
		setFilters(filters) {
			this.filters = filters;
		},
		async loadCoaches(forceRefresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
			} catch (err) {
				this.error = 'Something went wrong';
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		}
	},
	created() {
		this.loadCoaches();
	}
};
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>
