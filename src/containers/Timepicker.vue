<template>
	<div class="container">
		<h3>Timepicker 组件</h3>
		<hr>
		<h4>Basic</h4>
		<d-timepicker-panel v-model="value"></d-timepicker-panel>
		<h4>Hide Seconds</h4>
		<d-timepicker-panel v-model="value1" format="HH:mm" @change="handleChange"></d-timepicker-panel>
		<h4>Popper mode</h4>
		<h5>hh:mm:ss</h5>
		<d-timepicker v-model="val"></d-timepicker>
		<h5>hh:mm</h5>
		<d-timepicker v-model="val1" @change="handleChange"></d-timepicker>
		<h4>Custom</h4>
		<d-timepicker v-model="val2" @change="handleChange1">
			<d-button type="link" slot="reference">时间: {{val3}}</d-button>
		</d-timepicker>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '00:23:33',
			value1: '12:22:33',
			val: '',
			val1: '03:12:11',
			val2: '03:02:00',
			val3: '03:02:00'
		}
	},
	methods: {
		handleChange(v) {
			console.log(v)
		},
		handleChange1(v){
			this.val3 = v;
		}
	}
}
</script>
