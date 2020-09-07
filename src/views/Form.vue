<template>
    <div>
        <form @submit.prevent="save" @reset="set_default">
            <v-row>
                <v-col> 
                    <v-row>
                        <v-col cols="2">
                            <v-btn color="blue-grey lighten-5" large  title="back" to="/">
                                <v-icon>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col >
                            <h1 style="margin-left: 30px" class="is-uppercase">
                                {{  ( is_edit ) ? 'Edit Note' : 'New Note'  }}
                            </h1>
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
            >
            </v-text-field>

            <v-textarea
                label="Content"
                solo
                description="content of the note"
                v-model="note.content"
                placeholder="Enter something..." 
                rows="15"
                required
                counter
            >
            </v-textarea>
        </form>
    </div>
</template>

<script>
import { store } from "../services/store";

export default {
    name: 'Form',
    data() {
        return {
            default_note: {
                title:'',
                content: ''
            },
            note: {},
            is_edit: false
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
            this.note = {...this.default_note}   
        },
        validate () {

        }
    },
    beforeMount() {
        let note_id = this.$route.params.id;
        
        if(typeof(note_id) === 'undefined') return this.set_default();

        this.note = store.findNote(note_id);

        this.is_edit = true;

        console.log(this.note)
    }
}
</script>