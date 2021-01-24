<template>
	<base-card>
		<h2>Filter coach</h2>
		<span class="filter-option">
			<input type="checkbox" id="frontend" checked @change="setFilter" />
			<label for="frontend">Frontend</label>
		</span>
		<span class="filter-option">
			<input type="checkbox" id="backend" checked @change="setFilter" />
			<label for="backend">Backend</label>
		</span>
		<span class="filter-option">
			<input type="checkbox" id="carrer" checked @change="setFilter" />
			<label for="carrer">Carrer</label>
		</span>
	</base-card>
</template>

<script>
export default {
	emits: ['change-filter'],
	data() {
		return {
			filters: {
				frontend: true,
				backend: true,
				carrer: true
			}
		};
	},
	methods: {
		setFilter(event) {
			const inputId = event.target.id;
			const isActive = event.target.checked;
			this.filters = {
				...this.filters,
				[inputId]: isActive
			};

			this.$emit('change-filter', this.filters);
		}
	}
};
</script>

<style lang="scss" scoped>
h2 {
	margin: 0.5rem 0;
}

.filter-option {
	margin-right: 1rem;

	label,
	input {
		vertical-align: middle;
	}

	label {
		margin-left: 0.25rem;
	}

	.active {
		label {
			font-weight: bold;
		}
	}
}
</style>
