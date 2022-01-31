import { MercCollection } from "../models/mercCollection";
import { State } from "./state";
import { ABILITY_DECREMENT, ABILITY_INCREMENT, ITEM_DECREMENT, ITEM_INCREMENT, SET_MERCENARIES } from "./types";

export default {
    [SET_MERCENARIES](state: State, mercenaries: MercCollection): void {
        state.mercenaries = mercenaries;
    },
    [ABILITY_INCREMENT](state: State, mercName: string, abilityName: string): void {
        if (state.collection[mercName].abilities[abilityName] < 5) {
            state.collection[mercName].abilities[abilityName]++;
        }
    },
    [ABILITY_DECREMENT](state: State, mercName: string, abilityName: string): void {

    },
    [ITEM_INCREMENT](state: State, mercName: string, abilityName: string): void {

    },
    [ITEM_DECREMENT](state: State, mercName: string, abilityName: string): void {

    },
}