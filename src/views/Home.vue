<template>
  <v-container fluid>
    <Search :searchTag.sync="searchTag" @results="getResults($event)" @clean="clean" />
    <v-row>
      <v-col v-for="(note, index) in notes" :key="index" cols="12" sm="12" md="6">
        <Note @searchTag="searchTag = $event" @removedNote="removeNote($event)" :data="note"/>
      </v-col>
    </v-row>
    <h1 v-if="notes.length < 1">
      <v-icon large color="info">
        mdi-information
      </v-icon>
      Any note added!
    </h1>
    <v-btn color="purple" class="float" rounded fab large to="/register">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import { store } from '../services/store'
import Note from '../components/Note'
import Search from '../components/Search'
export default {
  name: 'Home',
  components: {
    Note,
    Search
  },
  data () {
    return {
      notes: [],
      searchTag: ''
    }
  },
  methods: {
    getNotes () {
      this.notes = store.getNotes();
    },
    getResults (results) {
      if (Array.isArray(results)) {
        this.notes = results
      } else {
        this.$router.push('/note/' + results.id)
      }
    },
    removeNote (note) {
      const notes = [...this.notes]

      const idx = notes.findIndex(item => item.id === note.id)

      notes.splice(idx, 1)

      this.notes = [...notes]

    },
    clean () {
      this.getNotes()
      this.searchTag = ''
    }
  },
  mounted () {
    this.getNotes();
  }
}
</script>
<style lang="scss" scoped>
  .float {
    position:fixed;
    bottom:10%;
    right: 3%;
    background-color:#0C9;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    // box-shadow: 2px 2px 3px #999;
  }

  .my-float {
    margin-top:22px;
  }
</style>
