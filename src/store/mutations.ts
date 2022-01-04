import { State } from "./state";
import { SET_MERCENARIES } from "./types";

export default {
    [SET_MERCENARIES](state: State, mercenaries: object) {
        state.mercenaries = mercenaries;
    }
}