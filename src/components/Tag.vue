<template>
    <v-card>
        <v-card-title>
            Create tag
        </v-card-title>
        <v-card-text>
            <v-container>
                <form @submit.prevent="register">
                    <v-text-field
                        label="Name"
                        label-for="Name"
                        description="Name of the tag"
                        v-model="name"
                        required
                        placeholder="Please enter the tag name"
                    >
                    </v-text-field>
                </form>
            </v-container>
        </v-card-text>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="register" color="success" small>
                <v-icon left>
                    mdi-content-save
                </v-icon>
                Save
            </v-btn>
            <v-btn @click="cancel" text small>
                <v-icon>
                    mdi-close
                </v-icon>
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { store } from '../services/store'
export default {
    name: 'Tag',
    data () {
        return {
            name: ''
        }
    },
    methods: {
        register () {
            store.addTag(this.name)
            this.$emit('tagAdded', this.name)
            this.name = ''
        },
        cancel () {
            this.$emit('close', true)
        }
    }
}
</script>
