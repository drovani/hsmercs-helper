import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, GET_COLLECTED_MERC, ITEM_DECREMENT, ITEM_INCREMENT } from "./types";

export default <ActionTree<State, State>>{

    [ABILITY_INCREMENT]({ commit, getters,state }: ActionContext<State, State>,
        { mercName, abilityName }: { mercName: string, abilityName: string }): void {

        if (!getters[GET_COLLECTED_MERC](state)(mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(ABILITY_INCREMENT, { mercName, abilityName });

    },
    [ABILITY_DECREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName, abilityName }: { mercName: string, abilityName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(ABILITY_DECREMENT, { mercName, abilityName });

    },
    [ITEM_INCREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName, itemName }: { mercName: string, itemName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(ITEM_INCREMENT, { mercName, itemName });

    },
    [ITEM_DECREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName, itemName }: { mercName: string, itemName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(ITEM_DECREMENT, { mercName, itemName });

    },

}