import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import VuexPersistence from 'vuex-persist';
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, State } from "./state";


export const key: InjectionKey<Store<State>> = Symbol();
const vuexLocal = new VuexPersistence<State>({
    storage: window.localStorage
})

export const store = createStore<State>({
    state,
    getters,
    mutations,
    actions,
    plugins: [vuexLocal.plugin]
})

export function useStore() {
    return vuexUseStore(key);
}