<template>
	<div>
		<base-dialog :show="!!error" title="An error ocurrend" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>Requests Received</header>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasRequests && !isLoading">
					<request-item v-for="request in receivedRequests" :key="request.id" :email="request.userEmail" :message="request.message"></request-item>
				</ul>
				<h3 v-else>You haven't received any requests yet</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import RequestItem from './../../components/requests/RequestItem';

export default {
	components: {
		RequestItem
	},
	data() {
		return {
			isLoading: false,
			error: null
		};
	},
	computed: {
		receivedRequests() {
			return this.$store.getters['requests/requests'];
		},
		hasRequests() {
			return this.$store.getters['requests/hasRequests'];
		}
	},
	created() {
		this.loadRequests();
	},
	methods: {
		async loadRequests() {
			this.isLoading = true;
			try {
				await this.$store.dispatch('requests/fetchRequests');
			} catch {
				this.error = 'Somethig went wrong';
			}

			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		}
	}
};
</script>

<style lang="scss" scoped>
header {
	text-align: center;
	margin-bottom: 20px;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>
