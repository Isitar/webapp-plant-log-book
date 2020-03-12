import {Plant} from "@/models/Plant";
import {PlantSpecies} from "@/models/PlantSpecies";
import {PlantLogType} from "@/models/PlantLogType";

export interface IPlantLogBookState {
    plants: Plant[],
    plantSpecies: PlantSpecies[],
    plantLogTypes: PlantLogType[],
    showFooter: boolean,
    showMobileMenu: boolean,
    showAddPlantModal: boolean,
}