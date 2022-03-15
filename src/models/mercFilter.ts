import { Rarity, Role, Tribe } from "./constants";

export default interface MercFilter {
    roles?: Role[],
    rarities?: Rarity[],
    tribes?: Tribe[],
    collectedStatuses?: {
        collected: true | false | "all"
        status: null | "unlocks" | "maxed" | "completed"
    }
    sort?: {
        field: "name" | "tasks",
        direction: "ascending" | "descending"
    }
}