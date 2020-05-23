<template>
    <div>
        <b-form @submit.prevent="save" @reset="set_default">    
            
            <b-row class="mb-3">
                <b-col>
                    <h1>
                        <router-link class="btn btn-light bnt-lg mr-3" title="back" to="/">
                            <b-icon icon="arrow-left-short"></b-icon>
                        </router-link>
    
                        <span v-if="is_edit">
                            Edit Note    
                        </span>
                        
                        <span v-else>
                            New Note
                        </span>

                    </h1>
                </b-col>


                <b-col class="text-right">
                    <b-button class="mr-2" type="submit" variant="outline-success">Save</b-button>
                    <b-button type="reset" variant="outline-danger">Reset</b-button>
                </b-col>
            </b-row>
            
            <b-form-group
                id="input-group-1"
                label="Title"
                label-for="title"
                description="Title of the note"
            >
                <b-form-input
                id="title"
                v-model="note.title"
                type="text"
                required
                placeholder="Please enter the title"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Content"
                label-for="Content"
                description="content of the note"
            >
                <b-form-textarea
                    id="textarea"
                    v-model="note.content"
                    placeholder="Enter something..."
                    rows="10"
                ></b-form-textarea>
            </b-form-group>


        </b-form>
    </div>
</template>

<script>

const {dialog} = require('electron').remote;

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

            this.$router.push('/')

        },
        edit() {
            store.editNote(this.note);

            dialog.showMessageBox(null, {
              title: 'Success',
              type: 'info',
              buttons: ['Ok'],
              message: 'Note modification complete'
            })

        },
        set_default () {
            this.note = {...this.default_note}   
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