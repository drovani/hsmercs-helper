import CollectedMerc from "../models/collectedMerc";
import MercLibrary from "../models/mercLibrary";
import { State } from "./state";
import {
    ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, ITEM_DECREMENT, ITEM_INCREMENT, SET_MERC_LIBRARY, TASK_DECREMENT, TASK_INCREMENT
} from "./types";

export default {
    [SET_MERC_LIBRARY](state: State, mercenaries: MercLibrary): void {
        state.mercenaries = mercenaries;
    },
    [ADD_MERC_TO_COLLECTION](state: State, { mercName, mercCollected = false }: { mercName: string, mercCollected?: CollectedMerc | boolean }): void {
        if (state.collection[mercName]) {
            if (typeof mercCollected === "boolean") {
                state.collection[mercName].collected = mercCollected;
            } else if (typeof mercCollected === "object") {
                state.collection[mercName] = { ...mercCollected };
            }
        } else {
            let merc: CollectedMerc;
            if (typeof mercCollected === "boolean") {
                const fromLibrary = state.mercenaries[mercName];
                const abilities = Object.entries(fromLibrary.abilities).reduce((p, c) => { p[c[0]] = 1; return p }, {});
                const equipment = Object.entries(fromLibrary.equipment).reduce((p, c) => { p[c[0]] = 4 - (c[1].tiers?.length ?? 1) + 1; return p; }, {});
                merc = {
                    level: 30,
                    collected: mercCollected,
                    tasksCompleted: 0,
                    abilities: abilities,
                    equipment: equipment,
                    itemEquipped: null
                };
            } else {
                merc = mercCollected;
            }
            state.collection = {
                ...state.collection,
                [mercName]: merc
            };
        }
    },
    [ABILITY_INCREMENT](state: State, { mercName, abilityName }: { mercName: string, abilityName: string }): void {
        if (state.collection[mercName].abilities[abilityName] < 5) {
            state.collection[mercName].abilities[abilityName]++;
        }
    },
    [ABILITY_DECREMENT](state: State, { mercName, abilityName }: { mercName: string, abilityName: string }): void {
        if (state.collection[mercName].abilities[abilityName] > 1) {
            state.collection[mercName].abilities[abilityName]--;
        }
    },
    [ITEM_INCREMENT](state: State, { mercName, itemName }: { mercName: string, itemName: string }): void {
        if (state.collection[mercName].equipment[itemName] < 4) {
            state.collection[mercName].equipment[itemName]++;
        }
    },
    [ITEM_DECREMENT](state: State, { mercName, itemName }: { mercName: string, itemName: string }): void {
        const numTiers = state.mercenaries[mercName].equipment[itemName].tiers?.length ?? 1;
        if (state.collection[mercName].equipment[itemName] > 4 - numTiers + 1) {
            state.collection[mercName].equipment[itemName]--;
        }
    },

    [TASK_INCREMENT](state: State, { mercName }: { mercName: string }): void {
        if (state.collection[mercName].tasksCompleted < 18) {
            state.collection[mercName].tasksCompleted++;
        }
    },
    [TASK_DECREMENT](state: State, { mercName }: { mercName: string }): void {
        if (state.collection[mercName].tasksCompleted > 0) {
            state.collection[mercName].tasksCompleted--;
        }
    },
}