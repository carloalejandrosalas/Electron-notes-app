<template>
    <div>
        <form @submit.prevent="save" @reset="set_default">
            <v-row>
                <v-col> 
                    <v-row>
                        <v-col cols="2">
                            <v-btn color="" large  title="back" to="/">
                                <v-icon>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col >
                            <div>
                                <h1 style="margin-left: 30px">
                                    <span v-if="is_edit">
                                        Edit Note 
                                        <small class="primary--text">
                                            {{ title }}
                                        </small>
                                    </span>
                                    <span v-else>
                                        New Note
                                    </span>
                                </h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col class="text-right">
                    <v-btn type="submit" color="primary" class="mr-2">
                        <v-icon left>
                            mdi-content-save
                        </v-icon>
                        Save
                    </v-btn>
                    <v-btn color="red" outlined type="reset">
                        <v-icon left>
                            mdi-restore
                        </v-icon>
                        Reset
                    </v-btn>
                </v-col>
            </v-row>
            
            <v-text-field
                label="Title"
                label-for="title"
                description="Title of the note"
                v-model="note.title"
                required
                placeholder="Please enter the title"
                outlined
            >
            </v-text-field>

            <v-row>
                <v-col cols="11">
                    <v-autocomplete
                        v-model="note.tags"
                        :items="tags"
                        outlined
                        chips
                        small-chips
                        label="Tags"
                        multiple
                        clearable
                        deletable-chips
                        color="purple"
                    >
                    </v-autocomplete>
                    <v-btn small outlined color="info" to="/tags" style="margin-bottom:30px">
                        <v-icon left>
                            mdi-tag
                        </v-icon>
                        Manage tags
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="showModalTag = true"  dark color="purple"  fab >
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <v-select outlined label="Note color" placeholder="Pick a color" v-model="note.color" :items="colors"></v-select>

            <v-textarea
                :background-color="note.color"
                label="Content"
                :light="isLight"
                solo
                :dark="!isLight"
                description="content of the note"
                v-model="note.content"
                placeholder="Enter something..." 
                rows="15"
                required
                counter
            >
            </v-textarea>
            <v-dialog  v-model="showModalTag" max-width="290" persistent >
                <Tag @tagAdded="tagAdded($event)" @close="showModalTag = false"/>
            </v-dialog>
        </form>
    </div>
</template>

<script>
// Services
import { store } from "../services/store";
// Components
import Tag from '../components/Tag'
// Constants
import { COLORS, lightColors } from '../constants/colors'
const defaultNote = {
    title:'',
    content: '',
    tags: [],
    color: 'white'
}

export default {
    name: 'Form',
    components: {
        Tag
    },
    data() {
        return {
            note: { ...defaultNote },
            title: '',
            is_edit: false,
            tags: [],
            showModalTag: false,
            colors: COLORS
        }
    },
    methods: {

        save() {
            return (this.is_edit) ? this.edit() : this.register();
        },
        register() {
            console.log('register')
            store.saveNote(this.note)

            this.set_default()

            this.$store.commit('toast', {
                color: 'success',
                message: 'Note added successfuly',
                icon: 'mdi-check-circle'
            })

            this.$router.push('/')

        },
        edit() {
            store.editNote(this.note);

            this.$store.commit('toast', {
                color: 'purple',
                message: 'Note changes save successfuly',
                icon: 'mdi-check-circle'
            })

            this.$router.push('/')

        },
        set_default () {
            this.note = { ...defaultNote }   
        },
        tagAdded (tag) {
            this.note.tags.push(tag)
            this.tags.push(tag)
            this.showModalTag = false
        },
        getTags () {
            this.tags = store.getTags()
        },
    },
    beforeMount() {
        let note_id = this.$route.params.id;
        
        if(typeof(note_id) === 'undefined') return this.set_default();

        const note = store.findNote(note_id);

        this.title =  note.title
        this.note = note 

        this.is_edit = true;
    },
    computed: {
        isLight () {
            return lightColors.includes(this.note.color)
        }
    },
    mounted () {
        this.getTags()
    }
}
</script>