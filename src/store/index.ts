import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


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
        plants: []
    },
    getters: {
        getPlantById: (state) => (id: number) => {
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
