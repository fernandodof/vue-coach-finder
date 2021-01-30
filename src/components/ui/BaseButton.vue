<template>
	<router-link v-if="link" :to="to" :class="mode">
		<slot></slot>
	</router-link>
	<button v-else :class="mode">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
			default: false
		},
		to: {
			type: String,
			required: false,
			default: '/'
		},
		mode: {
			type: String,
			required: false,
			default: ''
		}
	}
};
</script>

<style lang="scss" scoped>
button,
a {
	text-decoration: none;
	padding: 0.75rem 1.5rem;
	font: inherit;
	background-color: #3a0061;
	border: 1px solid #3a0061;
	color: white;
	cursor: pointer;
	border-radius: 30px;
	margin-right: 0.5rem;
	display: inline-block;
	outline: none;

	&:hover,
	&:active,
	&:hover,
	&:active {
		background-color: #270041;
		border-color: #270041;
	}

	&:disabled {
		background: lightgray;
		color: #9b9a9b;
		border: #9b9a9b;
	}
}

.flat {
	background-color: transparent;
	color: #3a0061;
	border: none;
}

.outline {
	background-color: transparent;
	border-color: #270041;
	color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
	background-color: #edd2ff;
}
</style>
