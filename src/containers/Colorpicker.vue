<template>
	<div class="container">
		<h3>Colorpicker 组件</h3>
		<br> {{colorText}}<br>
		<d-colorpicker-panel @change="handleChange"></d-colorpicker-panel>
	</div>
</template>

<script>
import Color from 'tinycolor2';

export default {
	data() {
		return {
			colorText: ''
		}
	},
	methods: {
		handleChange(v) {
			this.colorText = v;
		}
	}
}
</script>
