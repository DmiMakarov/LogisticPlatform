<template>
  <div>
    <section>
      <h1>Добавить объявление</h1>
      <hr/><br/>

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="title" class="form-label">Заголовок:</label>
          <input type="text" name="title" v-model="form.title" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Описание:</label>
          <textarea
            name="content"
            v-model="form.content"
            class="form-control"
          ></textarea>
        </div> 
        <button type="submit" class="btn btn-primary">Принять</button>
      </form>
    </section>

    <br/><br/>

    <section>
      <h1>Объявления</h1>
      <hr/><br/>

      <div v-if="notes !== null && notes.length">
        <div v-for="note in notes" :key="note.id" class="notes">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <ul>
                <li><strong>Заголовок объявления:</strong> {{ note.title }}</li>
                <li><strong>Автор:</strong> {{ note.author.username }}</li>
                <li><router-link :to="{name: 'Note', params:{id: note.id}}">Описание</router-link></li>
              </ul>
            </div>
          </div>
          <br/>
        </div>
      </div>

      <div v-else>
        <p>К сожалению, сейчас объявлений нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
    };
  },
  created: function() {
    console.log("At created\n");
    return this.$store.dispatch('getNotes').catch(function (error){
      console.log(error)
    });
  },
  computed: {
    ...mapGetters({ notes: 'stateNotes'}),
  },
  methods: {
    ...mapActions(['createNote']),
    async submit() {
      await this.createNote(this.form).catch(function (error){
      console.log(error)
    });
    },
  },
});
</script>
