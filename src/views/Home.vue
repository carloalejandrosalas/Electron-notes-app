<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="flot-a">All my notes</h1>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-outline-success" to="register">
          New
        </router-link>
      </b-col>
    </b-row>

    <b-row v-if="notes.length > 0">
      <b-col v-for="(note, index) in notes" :key="index" md="4">
        <Note @removedNote="getNotes" :data="note" />
      </b-col>

    </b-row>

    <h5 v-else class="text-center mt-4">
        <b-icon icon="info-circle"></b-icon>
        Any note added...
    </h5>
    
  </div>
</template>

<script>
import { store } from "../services/store";
import Note from '../components/Note'

export default {
  name: 'Home',
  components: {
    Note
  },
  data() {
    return {
      notes: store.getNotes()
    }
  },
  methods: {
    getNotes() {
      this.notes = store.getNotes();
    }
  },
  mounted() {
    this.notes = store.getNotes();
  }
}
</script>
