<script setup lang="ts">

</script>

<template>
  <div class="main">
    <header class="header">
      <router-link class="settings-link" :to="{ name: 'main' }">
        <h1 class="header__logo">Wea<img src="./assets/umbrella.png" alt="umbrella" />her</h1>
      </router-link>
      <router-link class="settings-link" :to="{ name: 'settings' }">
        <img src="./assets/settings.svg" alt="settings" class="settings-img">
      </router-link>
    </header>

    <router-view></router-view>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header__logo {
  text-decoration: none;
}
</style>
