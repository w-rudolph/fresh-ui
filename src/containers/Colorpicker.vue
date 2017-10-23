<template>
	<div class="container">
		<h3>Colorpicker 组件</h3>
		<br> {{colorText}}<br>
		<d-colorpicker-panel v-model="colorText" alpha></d-colorpicker-panel>
	</div>
</template>

<script>
import Color from 'tinycolor2';

export default {
	data() {
		return {
			colorText: 'rgba(255, 255, 0, 0.67)'
		}
	},
}
</script>
