import CollectedMerc from "../models/collectedMerc";
import MercLibrary from "../models/mercLibrary";
import { State } from "./state";
import {
    ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, ITEM_DECREMENT, ITEM_INCREMENT, SET_MERC_LIBRARY
} from "./types";

export default {
    [SET_MERC_LIBRARY](state: State, mercenaries: MercLibrary): void {
        state.mercenaries = mercenaries;
    },
    [ADD_MERC_TO_COLLECTION](state: State, mercName: string, merc?: CollectedMerc): void {
        if (!state.collection[mercName]) {
            if (merc === undefined) {
                const fromLibrary = state.mercenaries[mercName];
                const abilities = Object.entries(fromLibrary.abilities).reduce((p, c) => { p[c[0]] = 1; return p }, {});
                const equipment = Object.entries(fromLibrary.equipment).reduce((p, c) => { p[c[0]] = 4 - c[1].tiers.length + 1; return p; }, {});
                merc = {
                    level: 30,
                    collected: true,
                    tasksCompleted: 0,
                    abilities: abilities,
                    equipment: equipment,
                    itemEquipped: null
                };
            }
            state.collection[mercName] = merc;
        }
    },
    [ABILITY_INCREMENT](state: State, mercName: string, abilityName: string): void {
        if (state.collection[mercName].abilities[abilityName] < 5) {
            state.collection[mercName].abilities[abilityName]++;
        }
    },
    [ABILITY_DECREMENT](state: State, mercName: string, abilityName: string): void {
        if (state.collection[mercName].abilities[abilityName] > 1) {
            state.collection[mercName].abilities[abilityName]--;
        }
    },
    [ITEM_INCREMENT](state: State, mercName: string, itemName: string): void {
        if (state.collection[mercName].equipment[itemName] < 4) {
            state.collection[mercName].equipment[itemName]++;
        }
    },
    [ITEM_DECREMENT](state: State, mercName: string, itemName: string): void {
        const numTiers = state.mercenaries[mercName].equipment[itemName].tiers?.length ?? 1;
        if (state.collection[mercName].equipment[itemName] > 4 - numTiers + 1) {
            state.collection[mercName].equipment[itemName]--;
        }
    },
}