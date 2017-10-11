<template>
	<div class="container">
		<h3>Timepicker 组件</h3>
		<hr>
		<h1>{{value}}</h1>
		<d-timepicker-panel v-model="value"></d-timepicker-panel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: [0, 0, 0]
		}
	}
}
</script>
