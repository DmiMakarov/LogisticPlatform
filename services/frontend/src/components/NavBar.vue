<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light" style="background-color: #e3f2fd;">
      <div class="container">
        <a href="/"><img src="../assets/logo_reactor.png" height="38" width="96" /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul v-if="isLoggedIn" class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Объявления</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Мой профиль</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Выход</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Регистрация</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Вход</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    }
  },
});
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
