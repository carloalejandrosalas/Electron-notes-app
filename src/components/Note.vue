<template>
    <div>

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
                            <v-list-item @click="showConfirm = true">
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

        <v-dialog
            v-model="showConfirm"
            max-width="290"
            persistent
        >
        <v-card>
            <v-card-title>
                Are you shure?
            </v-card-title>
            <v-card-text>
                You're going to remove the note <strong>{{ data.title }}</strong>, this operation is irreversible
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="remove" text color="error" small>
                    <v-icon left>
                        mdi-delete
                    </v-icon>
                    Yes
                </v-btn>
                <v-btn @click="showConfirm = false" text small>
                    <v-icon>
                        mdi-close
                    </v-icon>
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { store } from '../services/store'

export default {
    name: 'Note',
    props: {
        data: Object
    },
    data () {
        return {
            showConfirm: false
        }
    },
    methods: {
        remove() {
            store.removeNote(this.data.id);
            this.$emit('removedNote')

            this.$store.commit('toast', {
                color: 'dark',
                html: `The note <strong>${this.data.title}</strong> was removed succesfuly`,
                icon: 'mdi-delete',
                timeout: 4000
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