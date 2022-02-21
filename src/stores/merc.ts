import { defineStore } from "pinia";
import { MaxAbilityTiers, MaxCompletedTasks, MaxItemTiers, MercAbility, Mercenary, MercItem } from "../models/mercenary";
import MercFilter from "../models/mercFilter";
import { MercLibrary } from "../models/mercLibrary";
import { ApplyCollectedMerc, HydrateMercenary } from "../utilities/mercenary";

export interface State {
    mercenaries: Mercenary[];
}

export const useMercStore = defineStore('mercs', {
    state: (): State => {
        return {
            mercenaries: []
        };
    },
    getters: {
        filteredLibrary: (state) => {
            return (filter?: MercFilter): Mercenary[] => {
                if (filter === undefined) {
                    return state.mercenaries.sort((a, b) => a.mercName < b.mercName ? -1 : 1);
                }

                let mercs = state.mercenaries;

                if (Array.isArray(filter.roles)) {
                    mercs = mercs.filter(m => filter.roles.includes(m.role));
                }
                if (Array.isArray(filter.rarities)) {
                    mercs = mercs.filter(m => filter.rarities.includes(m.rarity));
                }
                if (Array.isArray(filter.tribes)) {
                    mercs = mercs.filter(m => filter.tribes.includes(m.tribe));
                }

                if (filter.sort !== undefined) {
                    if (filter.sort.field === "name") {
                        mercs.sort((a, b) => a.mercName < b.mercName ? -1 : 1);
                    } else if (filter.sort.field === "tasks") {
                        mercs.sort((a, b) => {
                            if (a.tasksCompleted == b.tasksCompleted) {
                                return a.mercName < b.mercName ? -1 : 1
                            } else {
                                return a.tasksCompleted < b.tasksCompleted ? -1 : 1
                            }
                        });
                    }

                    if (filter.sort.direction === "descending") {
                        mercs.reverse();
                    }
                }

                return mercs;
            }
        },
        collectionData: (state) => {
            const collected = state.mercenaries.filter(m => m.collected);
            const result = {};
            collected.forEach(c => result[c.mercName] = c.ExtractData());
            return result;
        },
        getAbility: (state) => (mercName: string, abilityName: string): MercAbility => {
            return state.mercenaries.find(m => m.mercName === mercName).abilities.find(a => a.abilityName === abilityName);
        },
        getItem: (state) => (mercName: string, itemName: string): MercItem => {
            return state.mercenaries.find(m => m.mercName === mercName).equipment.find(i => i.itemName === itemName);
        }

    },
    actions: {
        setMercCollection(payload: File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target.result === "string") {
                    const mercCollection = JSON.parse(e.target.result) as MercLibrary;
                    // for(const merc of (this.mercenaries as Mercenary[])){
                    //     if (typeof mercCollection[merc.mercName] !== "undefined"){
                    //         merc.InjestData(mercCollection[merc.mercName]);
                    //     }
                    // }
                    for (const collName in mercCollection.collection) {
                        var merc = (this.mercenaries as Mercenary[]).find(m => m.mercName === collName);

                        if (typeof merc === "undefined") {
                            Error(`${collName} not found while setting collection data.`)
                        }else{
                            console.debug(typeof merc);
                        }

                        ApplyCollectedMerc(merc, mercCollection.collection[collName]);
                    }
                }
            }
            reader.readAsText(payload);
        },
        setMercLibrary(payload: MercLibrary) {
            const mercs = [] as Mercenary[];
            for (const mercName in payload) {
                const newmerc = HydrateMercenary(mercName, payload[mercName]);
                mercs.push(newmerc);
            }
            this.mercenaries = mercs;
        },
        setCollectedForMerc(mercName: string, collected: boolean) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);

            if (typeof merc === undefined) {
                Error(`${mercName} not found while setting collected.`)
            }

            merc.collected = collected;
        },
        abilityIncrement(mercName: string, abilityName: string) {
            const ability = (this as State).mercenaries.find(m => m.mercName === mercName)?.abilities.find(a => a.abilityName === abilityName);

            if (typeof ability === undefined) {
                Error(`${mercName}:${abilityName} not found while incrementing ability.`);
            }

            if (ability.activeTier < MaxAbilityTiers) {
                ability.activeTier++;
            }
        },
        abilityDecrement(mercName: string, abilityName: string) {
            const ability = (this as State).mercenaries.find(m => m.mercName === mercName)?.abilities.find(a => a.abilityName === abilityName);

            if (typeof ability === undefined) {
                Error(`${mercName}:${abilityName} not found while decrementing ability.`);
            }

            if (ability.activeTier > 1) {
                ability.activeTier--;
            }
        },
        itemIncrement(mercName: string, itemName: string) {
            const item = (this as State).mercenaries.find(m => m.mercName === mercName)?.equipment.find(a => a.itemName === itemName);

            if (typeof item === undefined) {
                Error(`${mercName}:${itemName} not found while incrementing item.`);
            }

            if (item.activeTier < MaxItemTiers) {
                item.activeTier++;
            }
        },
        itemDecrement(mercName: string, itemName: string) {
            const item = (this as State).mercenaries.find(m => m.mercName === mercName)?.equipment.find(a => a.itemName === itemName);

            if (typeof item === undefined) {
                Error(`${mercName}:${itemName} not found while incrementing item.`);
            }

            if (item.activeTier > MaxItemTiers - item.tiers.length + 1) {
                item.activeTier--;
            }
        },
        taskIncrement(mercName) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);

            if (typeof merc === undefined) {
                Error(`${mercName} not found while incrementing tasksCompleted.`)
            }
            if (merc.tasksCompleted < MaxCompletedTasks) {
                merc.tasksCompleted++;
            }
        },
        taskDecrement(mercName) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);

            if (typeof merc === undefined) {
                Error(`${mercName} not found while decrementing tasksCompleted.`)
            }
            if (merc.tasksCompleted > 0) {
                merc.tasksCompleted--;
            }
        },
    }
})