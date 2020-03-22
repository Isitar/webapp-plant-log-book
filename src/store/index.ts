import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {IPlantLogBookState} from "@/store/IPlantLogBookState";
import {Plant} from "@/models/Plant";
import {PlantSpecies} from "@/models/PlantSpecies";
import {PlantLog} from "@/models/PlantLog";
import {PlantLogType} from "@/models/PlantLogType";

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
        showAside: false,
        showPlantListInAside: false,
        showAddPlantModal: false,
        showAddPlantLogModal: false,
    } as IPlantLogBookState,
    getters: {
        getPlantById: (state) => (id: string): Plant | null => {
            return state.plants.find(p => p.id === id) ?? null;
        },
        getPlantSpeciesById: (state) => (id: string): PlantSpecies | null => {
            return state.plantSpecies.find(ps => ps.id === id) ?? null;
        },
        getPlantsSorted: (state) => {
            return state.plants.concat().sort((p1, p2) => p1.name?.localeCompare(p2.name ?? 'Z') ?? -1);
        }
    },
    mutations: {
        closeMobileMenu(state: IPlantLogBookState) {
            state.showMobileMenu = false;
        },
        toggleMobileMenu(state: IPlantLogBookState) {
            state.showMobileMenu = !state.showMobileMenu;
        },
        toggleAside(state: IPlantLogBookState) {
            state.showAside = !state.showAside;
        },
        closeAside(state: IPlantLogBookState) {
            state.showAside = false;
            state.showPlantListInAside = false;
        },
        togglePlantListInAside(state: IPlantLogBookState) {
            if (state.showPlantListInAside) {
                state.showAside = false;
                state.showPlantListInAside = false;
            } else {
                if (!state.showAside) {
                    state.showAside = true;
                }
                state.showPlantListInAside = true;
            }
        },
        closeAddPlantModal(state: IPlantLogBookState) {
            state.showAddPlantModal = false;
        },
        openAddPlantModal(state: IPlantLogBookState) {
            state.showAddPlantModal = true;
        },
        closeAddPlantLogModal(state: IPlantLogBookState) {
            state.showAddPlantLogModal = false;
        },
        openAddPlantLogModal(state: IPlantLogBookState) {
            state.showAddPlantLogModal = true;
        },

        setPlants(state: IPlantLogBookState, payload: Plant[]) {
            state.plants = payload;
        },
        setPlantLogs(state: IPlantLogBookState, payload: { plantId: string; data: PlantLog[] }) {
            const plant = state.plants.find(p => p.id === payload.plantId);
            if (undefined === plant) {
                return;
            }
            plant.logs = payload.data;
            state.plants = [...state.plants.filter(p => p.id !== plant.id), plant];
        },
        setPlantSpecies(state: IPlantLogBookState, payload: PlantSpecies[]) {
            state.plantSpecies = payload;
        },
        setPlantLogTypes(state: IPlantLogBookState, payload: PlantLogType[]) {
            state.plantLogTypes = payload;
        }
    },
    actions: {
        async loadPlants(context) {
            const response = await Api.get<Plant[]>('plant');
            context.commit('setPlants', response.data);
        },
        async loadPlantSpecies(context) {
            const response = await Api.get<PlantSpecies[]>('plant-species');
            context.commit('setPlantSpecies', response.data);

        },
        async loadPlantLogsForPlant(context, payload: { plantId: string }) {
            const response = await Api.get<PlantLog[]>(`plant/${payload.plantId}/plant-log`);
            context.commit('setPlantLogs', {plantId: payload.plantId, data: response.data});
        },
        async loadPlantLogTypes(context) {
            const response = await Api.get<PlantLogType[]>('plant-log-type');
            context.commit('setPlantLogTypes', response.data);
        },
        async createPlantLog(context, payload: { plantId: string; logType: string; log: string }) {
            await Api.post(`plant/${payload.plantId}/plant-log`, {
                plantLogTypeId: payload.logType,
                dateTime: new Date().toJSON(),
                log: payload.log,
            });
            context.dispatch('loadPlantLogsForPlant', {plantId: payload.plantId});
        },
        async createPlant(context, payload: { name: string; plantSpeciesId: string }) {
            await Api.post('plant', {
                name: payload.name,
                plantSpeciesId: payload.plantSpeciesId
            });
            context.dispatch('loadPlants');
        },
        async deletePlant(context, payload: string) {
            await Api.delete(`plant/${payload}`);
            context.dispatch('loadPlants');
        },
    },
    modules: {}
})
