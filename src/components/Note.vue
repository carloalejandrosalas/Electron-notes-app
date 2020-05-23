<template>
    <b-card>
        <b-row>
            <b-col cols="10">
                <h4>
                    {{data.title}}
                </h4>        
            </b-col>
                <b-dropdown variant="link" no-caret>
                    <template v-slot:button-content>
                        <b-icon class="text-dark" icon="three-dots-vertical"></b-icon>
                    </template>

                    <b-dropdown-item :to="'/note/'+data.id">Open</b-dropdown-item>
                    <b-dropdown-item @click="remove">Remove</b-dropdown-item>

                    
                </b-dropdown>
            <b-col cols="2">

            </b-col>
        </b-row>
        {{ getContent }}

    </b-card>
</template>

<script>
import { store } from '../services/store'
const {dialog} = require('electron').remote


export default {
    name: 'Note',
    props: {
        data: Object
    },
    methods: {
        remove() {
            dialog.showMessageBox(null, {
                title: '¿Are you shure?',
                type: 'warning',
                buttons: ["Yes","Cancel"],
                message: "You're going to remove this note, this operation is irreversible"
                
            }, (value) => {
                if(value === 0) {
                    store.removeNote(this.data.id);
                    this.$emit('removedNote')
                }
            })
        }
    },
    computed: {
        getContent() {
           return this.data.content.substr(0, 300)+"..."
        }
    }
}
</script>