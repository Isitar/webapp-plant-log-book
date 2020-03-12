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
        plantLogTypes: [],
        showFooter: true,
        showMobileMenu: false,
        showAddPlantModal: false
    } as IPlantLogBookState,
    getters: {
        getPlantById: (state) => (id: string) => {
            return state.plants.find(p => p.id === id);
        },
        getPlantSpeciesById: (state) => (id: string) => {
            return state.plantSpecies.find(ps => ps.id === id);
        },
    },
    mutations: {
        toggleMobileMenu(state) {
            state.showMobileMenu = !state.showMobileMenu;
        },
        closeAddPlantModal(state) {
            state.showAddPlantModal = false;
        },
        openAddPlantModal(state) {
            state.showAddPlantModal = true;
        },

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
        },
        setPlantLogTypes(state, payload) {
            state.plantLogTypes = payload;
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
        async loadPlantLogTypes(context) {
            Api.get('plant-log-type')
                .then(res => {
                    context.commit('setPlantLogTypes', res.data);
                })
        },
        async savePlantLog(context, payload: { plantId: string; logType: string; log: string }) {
            Api.post(`plant/${payload.plantId}/plant-log`, {
                plantLogTypeId: payload.logType,
                dateTime: new Date().toJSON(),
                log: payload.log,
            }).then(res => {
                context.dispatch('loadPlantLogsForPlant', {plantId: payload.plantId});
            });
        },
    },
    modules: {}
})
