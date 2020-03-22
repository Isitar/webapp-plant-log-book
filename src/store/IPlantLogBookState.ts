import {Plant} from "@/models/Plant";
import {PlantSpecies} from "@/models/PlantSpecies";
import {PlantLogType} from "@/models/PlantLogType";

export interface IPlantLogBookState {
    plants: Plant[],
    plantSpecies: PlantSpecies[],
    plantLogTypes: PlantLogType[],
    showFooter: boolean,
    showMobileMenu: boolean,
    showAside: boolean,
    showPlantListInAside: boolean,
    showAddPlantLogModal: boolean,
    showAddPlantModal: boolean,

    confirmDialogOpen: boolean,
    confirmDialogText: string,
    confirmDialogSuccessCallback: (() => void) | null,
    confirmDialogCancelCallback: (() => void) | null,
}