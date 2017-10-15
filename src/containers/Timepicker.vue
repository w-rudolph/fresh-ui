<template>
	<div class="container">
		<h3>Timepicker 组件</h3>
		<hr>
		<h4>Basic</h4>
		<d-timepicker-panel v-model="value"></d-timepicker-panel>
		<h4>Hide Seconds</h4>
		<d-timepicker-panel :show-seconds="false" v-model="value1" @change="handleChange"></d-timepicker-panel>
		<h4>Popper mode</h4>
		<h5>hh:mm:ss</h5>
		<d-timepicker v-model="val"></d-timepicker>
		<h5>hh:mm</h5>
		<d-timepicker v-model="val1" :show-seconds="false"></d-timepicker>
		<h4>Custom</h4>
		<d-timepicker v-model="val2">
			<d-button type="link" slot="reference">时间: {{val2}}</d-button>
		</d-timepicker>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: [0, 0, 0],
			value1: [1, 0, 0],
			val: '',
			val1: '',
			val2: ''
		}
	},
	methods: {
		handleChange(v) {
			console.log(v)
		}
	}
}
</script>
