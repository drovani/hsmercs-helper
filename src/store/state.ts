import { MercCollection } from "../models/mercCollection";

export interface State {
    mercenaries: MercCollection;
}

export function state(): State {
    return {
        mercenaries: {}
    }
}