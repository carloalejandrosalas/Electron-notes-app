<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card-title>
          <h1 class="text-center">
            Export Wizard
          </h1>
        </v-card-title>
        <v-card-text>
          <v-checkbox v-model="options" value="notes" :label="`Export all notes (${notes.length})`">
          </v-checkbox>
          <v-checkbox v-model="options" value="tags" :label="`Export all tags (${tags.length})`">
          </v-checkbox>
          <v-btn @click="exportData" class="mt-4" color="primary">
            Export
          </v-btn>
        </v-card-text>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { store } from '../services/store'
const { dialog } = require('electron').remote
const fs = require('fs')
export default {
  name: 'Wizard',
  data () {
    return {
      notes: [],
      tags: [],
      options: []
    }
  },
  methods: {
    getData () {
      this.notes = store.getNotes()
      this.tags = store.getTags()
    },
    exportData () {
      try {
        const data = []
  
        if (this.options.includes('notes')) {
          data.push({
            notes: [...this.notes]
          })
        }
  
        if (this.options.includes('tags')) {
          data.push({
            tags: [...this.tags]
          })
        }

        if (data.length === 0) {
           return this.$store.commit('toast', {
              color: 'orange darken-3',
              html: `Select minimum one option`,
              icon: 'mdi-exclamation-thick',
              timeout: 2000
            })
        }
  
        const dir = dialog.showSaveDialog(null, {
          title: 'Export file',
          defaultPath: `data_electron_notes_app_${new Date().getTime()}.json`,
          buttonLabel: 'Export data',
          filters: ['json'],
          message: 'Select the folder where you want the file'
        })

        if (typeof (dir) === 'undefined') {
          return this.$store.commit('toast', {
            color: 'dark',
            html: `The export operation was cancelled`,
            icon: 'mdi-information',
            timeout: 4000
          })
        }
  
        fs.writeFileSync(dir, JSON.stringify(data))

        this.$store.commit('toast', {
          color: 'success',
          html: `The data was export successfuly`,
          icon: 'mdi-check',
          timeout: 4000
        })

      } catch (err) {
        this.$store.commit('toast', {
          color: 'error',
          html: `Error ocurred during the export`,
          icon: 'mdi-error',
          timeout: 4000
        })
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
