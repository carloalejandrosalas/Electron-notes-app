import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// States
import { toast } from './states/toast'

export const store = new Vuex.Store(toast)
