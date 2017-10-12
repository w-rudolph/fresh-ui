<template>
	<div class="container">
		<h3>Timepicker 组件</h3>
		<hr>
		<h4>Basic</h4>
		<d-timepicker-panel v-model="value"></d-timepicker-panel>
		<h4>Hide Seconds</h4>
		<d-timepicker-panel :show-seconds="false" v-model="value1" @change="handleChange"></d-timepicker-panel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: [0, 0, 0],
			value1: [1, 0, 0]
		}
	},
	methods: {
		handleChange(v) {
			console.log(v)
		}
	}
}
</script>
