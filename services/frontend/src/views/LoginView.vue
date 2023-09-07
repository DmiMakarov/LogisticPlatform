<template>
  <section>
    <form @submit.prevent="submit">
      <h3>Вход</h3>
      <div class="mb-3">
        <label for="username" class="form-label">Имя пользователя:</label>
        <input type="text" name="username" v-model="form.username" class="form-control form-control-lg" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль:</label>
        <input type="password" name="password" v-model="form.password" class="form-control form-control-lg" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Вход</button>
    </form>
    <slot>{{ error }}</slot>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password:'',
      },
      error: ''
    };
  },
  methods: {
    ...mapActions(['logIn']),
    async submit() {
      const User = new FormData();
      User.append('username', this.form.username);
      User.append('password', this.form.password);
      try{
        this.err = ''
        await this.logIn(User);
        this.$router.push('/dashboard')
      }  catch (err) {
        console.log("See error")
        console.log(err)
        if(err.response == undefined){
          console.log("Throwing it")
          throw err
        }
        else if(err.response.status === 401){
          console.log("Set err")
          this.error="Ошибка: неверный логин или пароль";
        }
        else{
          console.log("Again throwing")
          throw err
        }
      }

    }
  }
});
</script>
