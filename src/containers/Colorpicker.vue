<template>
	<div class="container">
		<h3>Colorpicker 组件</h3>
		<br>
		<d-colorpicker></d-colorpicker>
	</div>
</template>

<script>
import Color from 'tinycolor2';

export default {
	data() {
		return {
		}
	},
	created() {
		window.Color = Color;
		console.log(Color('red').toRgb());
	}
}
</script>
