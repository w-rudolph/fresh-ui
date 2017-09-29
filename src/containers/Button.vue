<template>
	<div class="container">
		<h3>Button 组件</h3>
		<br>
		<d-button>Default</d-button>
		<d-button type="primary">Primary</d-button>
		<d-button type="info">Info</d-button>
		<d-button type="success">Success</d-button>
		<d-button type="warning">Warning</d-button>
		<d-button type="danger">Danger</d-button>
		<d-button type="link">Link</d-button>
		<d-button size="small">Small</d-button>
		<d-button size="large">Large</d-button>
		<d-button type="primary" disabled>Primary</d-button>
		<d-button disabled>Default</d-button>
		<d-button type="link" disabled>Link</d-button>

		<br>
		<h4>Button Group</h4>
		<d-button-group>
			<d-button type="primary">Primary</d-button>
			<d-button type="primary">Primary</d-button>
			<d-button type="primary">Primary</d-button>
		</d-button-group>

		<br>
		<h4>loading</h4>
		<d-button type="primary" :loading="loading">Primary</d-button>
		<d-button @click="toggle">toggle</d-button>

		<br>
		<h4>Icon</h4>
		<d-button icon="home"></d-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: true
		}
	},
	methods: {
		toggle() {
			this.loading = !this.loading;
		}
	}
}
</script>
