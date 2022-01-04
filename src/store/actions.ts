import { ActionContext } from "vuex";
import { State } from "./state";
import { SET_MERCENARIES } from "./types";

export default {
    [SET_MERCENARIES]({ commit }: ActionContext<State, State>, mercenaries: object) {
        commit(SET_MERCENARIES, mercenaries);
    }
}