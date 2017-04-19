<template>
  <div id="app">

  <keep-alive >
    <transition name="fade" mode="out-in" >
    <router-view></router-view>
    </transition>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
