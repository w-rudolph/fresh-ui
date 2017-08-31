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
    <p>
      <d-popper :placement="placement" ref="_popper" title="标题">
        <div slot="content">
          <div>Hello World!</div>
        </div>
      </d-popper>
      <d-popper :placement="placement" style="width:200px;" ref="_popper1" trigger="hover" title="标题1">
        <div slot="content">
          <div>
            Hello World!<br>
            <a href="#">Asssssss</a>
          </div>
        </div>
      </d-popper>
      <button v-popper:_popper>click</button>
      <d-button v-popper:_popper1 type="text">click</d-button>
    </p>
    <br><br><br><br><br>
    <select v-model="placement">
      <option value="top">top</option>
      <option value="top-start">top-start</option>
      <option value="top-end">top-end</option>
      <option value="right">right</option>
      <option value="bottom">bottom</option>
      <option value="bottom-start">bottom-start</option>
      <option value="left">left</option>
      <option value="auto">auto</option>
    </select>
  </div>
</template>

<script>
import Popper from '../packages/utils/popper';
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Hello World!',
      tags: ['default', 'danger', 'success'],
      rateNum: 3,
      rateNum1: 6,
      placement: 'auto',
      popper: null,
      show: false,
      popperRef: null,
    }
  },
  watch: {
    placement() {
      this.initPop();
    }
  },
  created() {
    // console.log(this);
  },
  mounted() {
    this.dispatch('app', 'hello', { a: 1 });
    this.subscribe('parant_event', payload => {
      console.log(payload);
    });
    this.initPop();
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
    },
    initPop() {
      var reference = document.querySelector('.d-popper-ref');
      // var popper = document.querySelector('.d-popper');

      // let arrow = popper.querySelector('.d-popper__arrow');
      // arrow.setAttribute('x-arrow', '');
      // this.popper = new Popper(
      //   reference,
      //   popper,
      //   {
      //     placement: this.placement,
      //     trigger: 'click',
      //     arrowElement: arrow
      //   }
      // );
    },
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
