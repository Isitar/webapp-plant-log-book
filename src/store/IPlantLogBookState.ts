import {Plant} from "@/models/Plant";

export interface IPlantLogBookState {
    plants: Plant[],
    showFooter: boolean,
}