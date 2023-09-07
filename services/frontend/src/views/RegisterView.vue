<template>
  <section>
    <form @submit.prevent="submit">
      <h3>Регистрация</h3>
      <div class="mb-3">
        <label for="username" class="form-label">Имя пользователя</label>
        <input type="text" name="username" v-model="user.username" class="form-control form-control-lg" />
      </div>
      <div class="mb-3">
        <label for="full_name" class="form-label">Полное имя:</label>
        <input type="text" name="full_name" v-model="user.full_name" class="form-control form-control-lg" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль:</label>
        <input type="password" name="password" v-model="user.password" class="form-control form-control-lg" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Регистрация</button>
    </form>
    <slot>{{ err }}</slot>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        full_name: '',
        password: '',
      },
      err: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    async submit() {
      try {
        await this.register(this.user);
        this.$router.push('/dashboard')
      } catch (error) {
        this.err = 'Пользователь с таким именем уже существует'
        throw 'Username already exists. Please try again.';
      }
    },
  },
});
</script>
