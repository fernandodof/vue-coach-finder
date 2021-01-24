<template>
	<div class="spinner"></div>
</template>

<style lang="scss" scoped>
$spinner-dimension: 100px;
$border-width: $spinner-dimension / 10;
$spinner-color: #270041;

.spinner {
	margin: 0 auto;
	border-radius: 50%;
	width: $spinner-dimension;
	height: $spinner-dimension;
	border: $border-width solid transparent;
	border-top: $border-width solid $spinner-color;
	animation: rotating 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

@keyframes rotating {
	100% {
		transform: rotate(360deg);
	}
}
</style>
