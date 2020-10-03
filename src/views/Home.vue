<template>
  <v-container fluid>
    <Search @results="getResults($event)" @clean="getNotes" />
    <v-row>
      <v-col v-for="(note, index) in notes" :key="index" cols="12" sm="12" md="6">
        <Note @removedNote="getNotes" :data="note"/>
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
      notes: []
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
    box-shadow: 2px 2px 3px #999;
  }

  .my-float {
    margin-top:22px;
  }
</style>
