<template>
    <div class="search">
        <v-autocomplete
        v-model="result"
        :items="results"
        :search-input.sync="search"
        color="purple"
        hide-no-data
        hide-selected
        item-value="Notes"
        label="Notes Search"
        solo
        placeholder="Search something"
        prepend-inner-icon="mdi-magnify"
        hint="You can search title, content or tag"
        persistent-hint
        @input="selectResult($event)"
        return-object
        clear-icon="mdi-close"
        clearable
      >
        <template v-slot:item="data">
            <template>
                <v-list-item-icon>
                    <v-icon color="purple">
                        {{ data.item.type | typeIcon }}
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content v-text="data.item.text"></v-list-item-content>
            </template>
        </template>
      </v-autocomplete>
    </div>
</template>

<script>
// Services
import { store } from '../services/store'
// Constants
import { COLORS } from '../constants/colors'
export default {
    name: 'Search',
    data () {
        return {
            result: '',
            results: [],
            search: ''
        }
    },
    methods: {
        searchResults () {
            const results = []
            const search = this.search.toLowerCase()

            const notes = store.getNotes(),
            tags = store.getTags()

            notes.forEach(note => {
                const { title, content } = note

                if (title.toLowerCase().includes(search)) results.push({
                    type: 'title',
                    text: note.title,
                    note: note
                })
                
                if (content.toLowerCase().includes(search)) {
                  const { content: noteContent } = note
                  const content = noteContent.length <= 50 ? noteContent : noteContent.substring(0, 50) + '...'
                  results.push({
                      type: 'content',
                      text:  content,
                      note: note
                  })
                }
            })

            tags.forEach(tag => {
                if (tag.toLowerCase().includes(search)) results.push({
                    type: 'tag',
                    text: tag,
                })
            })

            COLORS.forEach(color => {
                if (color.toLowerCase().includes(search)) results.push({
                    type: 'color',
                    text: color
                })
            })

            this.results = results
        },
        selectResult (result) {
            if (result === '' || typeof (result) === 'undefined') return this.$emit('clean', true)
            
            const { type } = result

            if (type === 'tag' || type === 'color') {
                const results = []
                
                const notes = store.getNotes()

                notes.forEach(note => {
                    if (type === 'tags') {
                        const { tags } = note
                        tags.forEach(tag => {
                            if (tag === result.text) results.push(note)
                        })
                    } else {
                        const { color } = note
                        if (color === result.text) results.push(note)
                    }
                })

                this.$emit('results', results)
            } else {
                this.$emit('results', result.note)
            }
        }
    },
    watch: {
        search (val) {
            if (val === '' || val === null || typeof(val) === 'undefined' ) return this.$emit('clean', true)
            this.searchResults()
        }
    },
    filters: {
        typeIcon (val) {
            switch (val) {
                case 'title':
                    return 'mdi-format-title'
                case 'tag':
                    return 'mdi-tag'
                case 'content':
                    return 'mdi-card-text'
                case 'color':
                    return 'mdi-palette'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .search {
        margin-bottom: 20px;
    }
</style>
