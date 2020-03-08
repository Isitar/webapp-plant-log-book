import {Plant} from "@/models/Plant";
import {PlantSpecies} from "@/models/PlantSpecies";

export interface IPlantLogBookState {
    plants: Plant[],
    plantSpecies: PlantSpecies[],
    showFooter: boolean,
}