import {PlantLog} from "@/models/PlantLog";

export class Plant {
    public id: string|null = null;
    public plantSpeciesId: string|null = null;
    public name: string|null = null;
    public isActive: boolean = true;

    public logs: PlantLog[] = [];
}