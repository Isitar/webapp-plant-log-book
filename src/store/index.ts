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
        plantSpecies: [],
        showFooter: true,
    } as IPlantLogBookState,
    getters: {
        getPlantById: (state) => (id: string) => {
            return state.plants.find(p => p.id === id);
        },
        getPlantSpeciesById: (state) => (id: string) => {
            console.debug('requesting plant species with id', id);
            console.debug('plant species', state.plantSpecies);
            return state.plantSpecies.find(ps => ps.id === id);
        },
    },
    mutations: {
        setPlants(state, payload) {
            state.plants = payload;
        },
        setPlantLogs(state, payload) {
            const plant = state.plants.find(p => p.id === payload.plantId);
            if (undefined === plant) {
                return;
            }
            plant.logs = payload.data;
            state.plants = [...state.plants.filter(p => p.id !== plant.id), plant];
        },
        setPlantSpecies(state, payload) {
            state.plantSpecies = payload;
        }
    },
    actions: {
        async loadPlants(context) {
            Api.get('plant')
                .then(res => {
                    context.commit('setPlants', res.data);
                })
        },
        async loadPlantSpecies(context) {
            Api.get('plant-species')
                .then(res => {
                    context.commit('setPlantSpecies', res.data);
                })
        },
        async loadPlantLogsForPlant(context, payload: { plantId: string }) {
            Api.get(`plant/${payload.plantId}/plant-log`)
                .then(res => {
                    context.commit('setPlantLogs', {plantId: payload.plantId, data: res.data});
                })
        },
    },
    modules: {}
})
