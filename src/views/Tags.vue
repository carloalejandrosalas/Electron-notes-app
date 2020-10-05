<template>
    <div>
        <v-btn @click="returnBack" style="margin-bottom:30px">
            <v-icon>
                mdi-chevron-left
            </v-icon>
            Back
        </v-btn>
        <v-card>
            <v-card-title>
                <v-icon left>
                    mdi-tag
                </v-icon>
                My tags
            </v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item-group v-model="tagsSelected" multiple>
                        <v-list-item v-for="(tag, index) in tags" :key="index">
                             <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox color="red" :input-value="active" ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                    {{ tag }}
                                </v-list-item-content>
                             </template>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="deleteTags" color="error">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                    Delete selected
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { store } from '../services/store'
export default {
    data () {
        return {
            tags: [],
            tagsSelected: []
        }
    },
    methods: {
        deleteTags () {
            const tags = [...this.tags]
            const newTags = []
            const removedTags = []

            this.tags.forEach((tag, idx) => {
                if (!this.tagsSelected.includes(idx)) {
                    newTags.push(tag)
                } else {
                    console.log({tags})
                    removedTags.push(tags[idx])
                }
            })

            this.tags = [...newTags]
            this.tagsSelected = []
            
            store.setTags(newTags)
            this.cleanTagsNotes(removedTags)

            this.$store.commit('toast', {
                color: 'error',
                message: 'Tags deleted successfuly',
                icon: 'mdi-delete'
            })

        },
        /**
         *  Method to clean the tags in notes.
         *  @param {Array} removedTags All removed tags
         */
        cleanTagsNotes(removedTags) {
            const notes = store.getNotes()

            notes.forEach(note => {
                const tagsNote = note.tags.filter(tag => !removedTags.includes(tag))
            
                note.tags = tagsNote
                
                store.editNote(note)
            })
        },
        returnBack () {
            this.$router.back()
        }
    },
    mounted () {
        this.tags = store.getTags()
    }
}
</script>