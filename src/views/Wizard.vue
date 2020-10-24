<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-card-title>
              <h2 class="text-center">
                Export Wizard
              </h2>
            </v-card-title>
            <v-card-text>
              <v-checkbox v-model="options" value="notes" :label="`Export all notes (${notes.length})`">
              </v-checkbox>
              <v-checkbox v-model="options" value="tags" :label="`Export all tags (${tags.length})`">
              </v-checkbox>
              <v-btn :disabled="options.length < 1" @click="exportData" class="mt-4" color="purple darken-3">
                <v-icon left>
                  mdi-export
                </v-icon>
                Export
              </v-btn>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <v-card-title>
              <h2>
                Import Wizard
              </h2>
            </v-card-title>
            <v-file-input v-model="file" accept="application/json" label="Select the import file"></v-file-input>
            <v-btn @click="importData" color="purple darken-3 mt-3" :disabled="file === null || file === undefined">
              <v-icon left>
                mdi-import
              </v-icon>
              Import
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { Note } from '../models/Note'
import { store } from '../services/store'
const { dialog } = require('electron').remote
const fs = require('fs')
export default {
  name: 'Wizard',
  data () {
    return {
      notes: [],
      tags: [],
      options: [],
      file: null,
      logs: []
    }
  },
  methods: {
    getData () {
      this.notes = store.getNotes()
      this.tags = store.getTags()
    },
    exportData () {
      try {
        const data = {}
  
        if (this.options.includes('notes')) {
          data.notes = [...this.notes]
        }
  
        if (this.options.includes('tags')) {
          data.tags = [...this.tags]
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
    },
    importData () {
      const { path } = this.file
      const data = JSON.parse(fs.readFileSync(path).toString()) || null

      if (data === null) {
        return this.$store.commit('toast', {
          message: 'Lo que sea'
        })
      }

      console.log('data', data)

      this.validateData(data)
    },
    validateData (data) {
      const { notes, tags } = data
      const logs = []
      const importNotes = []
      const currentNotes = store.getNotes()
      const currentTags = store.getTags()
      const importTags = []

      if (Array.isArray(notes)) {
        notes.forEach(item => {
          const { title, content, tags, color, id } = item

          const note = new Note(title, content, tags, color, id)
          
          const { error, message } = note.validate()

          if (error) {
            logs.push({
              note,
              type: 'note',
              message
            })
          } else {
            const idx = currentNotes.findIndex(note => note.id === id)

            if (idx !== -1) {
              const updateNote = {
                ...currentNotes[idx],
                title,
                content,
                tags
              }

              store.editNote(updateNote)

            } else {
              importNotes.push(note)
            }
          }
        });
      }

      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          const exist = currentTags.includes(tag)
          
          if (typeof (tag) !== 'string' || exist) {
            logs.push({
              tag,
              type: 'tag',
              message: exist ? 'Tag is current exists' : 'Tag element is not an String'
            })
          } else {
            importTags.push(tag)
          }
        })
      }

      this.logs = logs
      store.importNotes(importNotes)
      store.importTags(importTags)

      this.$store.commit('toast', {
        message: 'Import process finished successfuly',
        color: 'green',
        icon: 'mdi-check-circle',
      })

      this.file = null
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
