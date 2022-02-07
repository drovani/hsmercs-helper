import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, CLEAR_MERC_COLLECTION, GET_COLLECTED_MERC, ITEM_DECREMENT, ITEM_INCREMENT, SET_MERC_COLLECTION, TASK_DECREMENT, TASK_INCREMENT } from "./types";

export default <ActionTree<State, State>>{
    [SET_MERC_COLLECTION]({ commit }: ActionContext<State, State>,
        { jsonMercCollectionFile }: { jsonMercCollectionFile: File }): void {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target.result === "string") {
                const mercCollection = JSON.parse(e.target.result);
                commit(CLEAR_MERC_COLLECTION);
                console.debug(mercCollection.collection)
                commit(SET_MERC_COLLECTION, {collection: mercCollection.collection})
            }
        }
        reader.readAsText(jsonMercCollectionFile);
    },
    [ABILITY_INCREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName, abilityName }: { mercName: string, abilityName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
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
    [TASK_INCREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName }: { mercName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(TASK_INCREMENT, { mercName });

    },
    [TASK_DECREMENT]({ commit, getters }: ActionContext<State, State>,
        { mercName }: { mercName: string }): void {

        if (!getters[GET_COLLECTED_MERC](mercName)) {
            commit(ADD_MERC_TO_COLLECTION, { mercName });
        }
        commit(TASK_DECREMENT, { mercName });

    },

}