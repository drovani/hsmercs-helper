import { MercCollection } from "../models/mercCollection";
import { State } from "./state";
import { SET_MERCENARIES } from "./types";

export default {
    [SET_MERCENARIES](state: State, mercenaries: MercCollection): void {
        state.mercenaries = mercenaries;
    }
}