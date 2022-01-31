import { MercCollection } from "../models/mercCollection";

export interface State {
    mercenaries: MercCollection;
    collection: MercCollection;
}

export function state(): State {
    return {
        mercenaries: {},
        collection: {}
    }
}