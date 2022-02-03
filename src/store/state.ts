import MercCollection from "../models/mercCollection";
import MercLibrary from "../models/mercLibrary";

export interface State {
    mercenaries: MercLibrary;
    collection: MercCollection;
}

export function state(): State {
    return {
        mercenaries: {},
        collection: {}
    }
}