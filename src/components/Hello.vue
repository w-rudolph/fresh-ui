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
    <div>
      <d-popper :placement="placement" :hideWhenClickOutside="true" ref="_popper" title="标题" style="text-align: left">
        <div slot="content">
          <div>Hello World!</div>
        </div>
      </d-popper>
      <d-popper :placement="placement" :appendToBody="true" style="width:200px;" ref="_popper1" trigger="hover" title="标题1">
        <div slot="content">
          <div>
            Hello World!<br>
            <a href="#">Asssssss</a>
          </div>
        </div>
      </d-popper>
      <button v-popper:_popper>click</button>
      <d-button v-popper:_popper1 type="text">click</d-button>
    </div>
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

    <div>
      <d-collapse style="width: 500px; text-align:left" :accordion="true">
        <d-collapse-item>
          <template slot="title">title1</template>
          <template slot="content">content1</template>
        </d-collapse-item>
        <d-collapse-item>
          <template slot="title">title2</template>
          <template slot="content">content2</template>
        </d-collapse-item>
        <d-collapse-item>
          <template slot="title">title3</template>
          <template slot="content">content3</template>
        </d-collapse-item>
        <d-collapse-item>
          <template slot="title">title4</template>
          <template slot="content">
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；<br> 页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
          </template>
        </d-collapse-item>
        <d-collapse-item>
          <template slot="title">title5</template>
          <template slot="content">content5</template>
        </d-collapse-item>
      </d-collapse>
    </div>
    <div>
      <d-checkbox v-model="checkboxValue">北京</d-checkbox>
      <d-checkbox v-model="checkboxValue1">上海</d-checkbox>
    </div>
    <br><br><br><br><br>
    
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
      placement: 'auto',
      popper: null,
      show: false,
      popperRef: null,
      checkboxValue: true,
      checkboxValue1: false,
    }
  },
  watch: {
    
  },
  created() {
    window.instance = this;
  },
  mounted() {
    this.dispatch('app', 'hello', { a: 1 });
    this.subscribe('parant_event', payload => {
      console.log(payload);
    });
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
