<template>
  <div class="hello">
    <d-button disabled>Hahaha</d-button>
    <d-button @click="handleClick">Hahaha</d-button>
    <d-button type="link" size="lg">link</d-button>
    <d-button type="danger" size="sm">danger</d-button>
    <p>
      <d-input style="width: 200px;" type="number" disabled>Hahaha</d-input>
      <d-input style="width: 200px;" size="sm" v-model="msg" @change="handleChange" @enter="handleChange">Hahaha</d-input>
    </p>
    <p>
      <d-icon name="angle-double-left" size="2x"></d-icon>
      <d-icon name="camera-retro" size="lg"></d-icon>
    </p>
    <p>
      <d-tag v-for="(tag, idx) in tags" :key="idx" :type="tag" icon="close" @icon-click="handleTagClose(idx)">{{tag}}</d-tag>
    </p>
    <p>
      <d-rate v-model="rateNum"></d-rate><br>
      <d-rate v-model="rateNum1" disabled></d-rate>
    </p>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Hello World!',
      tags: ['default', 'danger', 'success'],
      rateNum: 3,
      rateNum1: 6,
    }
  },
  mounted() {
    this.dispatch('app', 'hello', { a: 1 });
    this.subscribe('parant_event', payload => {
      console.log(payload);
    })
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    handleChange(v, e) {
      console.log(v);
    },
    handleKeyEnter(v, e) {
      console.log(v);
    },
    handleTagClose(idx) {
      this.tags.splice(idx, 1);
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
