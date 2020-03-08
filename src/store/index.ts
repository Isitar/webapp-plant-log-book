import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {IPlantLogBookState} from "@/store/IPlantLogBookState";

Vue.use(Vuex);

export const Api = axios.create({
    baseURL: 'https://localhost:5001/api/v1/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default new Vuex.Store({
    state: {
        plants: [],
        showFooter: true,
    } as IPlantLogBookState,
    getters: {
        getPlantById: (state) => (id: string) => {
            return state.plants.find(p => p.id === id);
        }
    },
    mutations: {
        setPlants(state, payload) {
            state.plants = payload;
        }
    },
    actions: {
        async loadPlants(context) {
            Api.get('plant')
                .then(res => {
                    context.commit('setPlants', res.data);
                })
        }
    },
    modules: {}
})
