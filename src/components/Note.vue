<template>
    <v-card>
        <v-row>
            <v-col cols="10">
                <v-card-title>
                    {{ data.title }}
                </v-card-title>
            </v-col>
            <v-col>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            color="dark"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>
                                mdi-dots-vertical
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="edit">
                            Edit
                        </v-list-item>
                        <v-list-item @click="remove">
                            Delete
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-card-text>
            {{ getContent }}
        </v-card-text>
    </v-card>
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
        },
        edit () {
            this.$router.push('/note/' + this.data.id)
        }
    },
    computed: {
        getContent() {
           return this.data.content.substr(0, 300)+"..."
        }
    }
}
</script>