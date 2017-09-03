<template>
  <div id="app">
    <div class="left-sidebar">
      <ul>
        <li v-for="r in routes" :key="r.path">
          <router-link :to="r.path">{{r.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import routes from './router/routes';

export default {
  name: 'app',
  data() {
    return {
      routes
    }
  }
}
</script>
<style>
#app {
  padding-top: 20px;
}

.left-sidebar,
.right-content {
  display: inline-block;
}

.left-sidebar {
  position: absolute;
  width: 200px;
  min-height: 500px;
  background: #effaff;
  border-right: 2px solid #effaff;
}

.left-sidebar ul {
  list-style: none;
  padding-left: 25px;
}

.left-sidebar ul li {
  padding: 5px;
}

.right-content {
  padding-left: 205px;
  width: 100%;
}
</style>
