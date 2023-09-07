<template>
  <section>
    <p>This site is built with FastAPI and Vue.</p>

    <div v-if="isLoggedIn" id="logout">
      <p id="logout">Click <a href="/dashboard">here</a> to view all notes.</p>
    </div>
    <p v-else>
      <span><a href="/register">Регистрация</a></span>
      <span> or </span>
      <span><a href="/login">Вход</a></span>
    </p>
    <yandex-map 
      :coords="coords"
      :behaviors="behaviors"
      :controls="controls"
      :zoom="zoom"
      class="yandex-container">
      <ymap-marker 
        marker-id="123" 
        :coords="coords"
        :marker-events="['click']"
      ></ymap-marker>
    </yandex-map>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      coords: [55.753215, 37.622504],
      zoom: 10,
      controls: ["zoomControl", "geolocationControl", "searchControl"],
      behaviors: ["drag"]
    }
  },
  computed : {
    activeCoords() {
      return this.coords[this.picked];
    },
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
});
</script>
<style>
.yandex-container {
  width: 770px;
  height: 400px;
}
</style>
