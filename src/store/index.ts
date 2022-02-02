import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, State } from "./state";

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state,
    getters,
    mutations,
    actions
})

export function useStore() {
    return vuexUseStore(key);
}