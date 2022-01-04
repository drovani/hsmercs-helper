import { createStore, useStore } from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, State } from "./state";

export const store = createStore<State>({
    state,
    getters,
    actions,
    mutations
})

export function getStore() {
    return {
        store: useStore()
    }
}