import { defineStore, PiniaPluginContext } from "pinia";
import { AbilityUpgradeCosts, ItemUpgradeCosts } from "../models/constants";
import { MercCollection } from "../models/mercCollection";
import { MaxAbilityTiers, MaxCompletedTasks, MaxItemTiers, MercAbility, Mercenary, MercItem } from "../models/mercenary";
import MercFilter from "../models/mercFilter";
import { MercLibrary } from "../models/mercLibrary";
import { ApplyCollectedMerc, ExtractCollectedMerc, HydrateMercenary } from "../utilities/mercenary";

export interface State {
    mercenaries: Mercenary[];
}

const MercStoreId = 'mercenaries' as const;

export const useMercStore = defineStore(MercStoreId, {
    state: (): State => {
        const fromStorage = JSON.parse(localStorage.getItem(MercStoreId));
        const mercs = [];
        if (fromStorage?.mercenaries) {
            for (const merc of fromStorage?.mercenaries) {
                mercs.push(HydrateMercenary(merc));
            }
        }
        return ({
            mercenaries: mercs
        })
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
                        if (filter.sort.direction === "ascending") {
                            mercs.sort((a, b) => a.mercName.localeCompare(b.mercName));
                        } else {
                            mercs.sort((a, b) => b.mercName.localeCompare(a.mercName));
                        }
                    } else if (filter.sort.field === "tasks") {
                        mercs.sort((a, b) => {
                            if (a.tasksCompleted == b.tasksCompleted) {
                                return a.mercName.localeCompare(b.mercName)
                            } else {
                                if (filter.sort.direction === "ascending") {
                                    return a.tasksCompleted < b.tasksCompleted ? -1 : 1
                                } else {
                                    return a.tasksCompleted > b.tasksCompleted ? -1 : 1
                                }
                            }
                        });
                    }
                }

                return mercs;
            }
        },
        collectionData: (state): MercCollection => {
            const collected = state.mercenaries.filter(m => m.collected);
            const result: MercCollection = {};
            collected.forEach(c => result[c.mercName] = ExtractCollectedMerc(c));
            return result;
        },
        getMercenary: (state) => (mercName: string) => {
            return state.mercenaries.find(m => m.mercName === mercName);
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
                    for (const collName in mercCollection.collection) {
                        var merc = (this.mercenaries as Mercenary[]).find(m => m.mercName === collName);

                        if (typeof merc === "undefined") {
                            throw new Error(`${collName} not found while setting collection data.`)
                        } else {
                            ApplyCollectedMerc(merc, mercCollection.collection[collName]);
                        }
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
                throw new Error(`${mercName} not found while setting collected.`)
            }

            merc.collected = collected;
        },
        abilityIncrement(mercName: string, abilityName: string) {
            const ability = (this as State).mercenaries.find(m => m.mercName === mercName)?.abilities.find(a => a.abilityName === abilityName);

            if (typeof ability === undefined) {
                throw new Error(`${mercName}:${abilityName} not found while incrementing ability.`);
            }

            if (ability.activeTier < MaxAbilityTiers) {
                ability.activeTier++;
                ability.costToMax = AbilityUpgradeCosts.slice(ability.activeTier).reduce((p, c) => p += c, 0);
            }
        },
        abilityDecrement(mercName: string, abilityName: string) {
            const ability = (this as State).mercenaries.find(m => m.mercName === mercName)?.abilities.find(a => a.abilityName === abilityName);

            if (typeof ability === undefined) {
                throw new Error(`${mercName}:${abilityName} not found while decrementing ability.`);
            }

            if (ability.activeTier > 1) {
                ability.activeTier--;
                ability.costToMax = AbilityUpgradeCosts.slice(ability.activeTier).reduce((p, c) => p += c, 0);
            }
        },
        itemIncrement(mercName: string, itemName: string) {
            const item = (this as State).mercenaries.find(m => m.mercName === mercName)?.equipment.find(a => a.itemName === itemName);

            if (typeof item === undefined) {
                throw new Error(`${mercName}:${itemName} not found while incrementing item.`);
            }

            if (item.activeTier < MaxItemTiers) {
                item.activeTier++;
                item.costToMax = ItemUpgradeCosts.slice(item.activeTier).reduce((p, c) => p += c, 0);
            }
        },
        itemDecrement(mercName: string, itemName: string) {
            const item = (this as State).mercenaries.find(m => m.mercName === mercName)?.equipment.find(a => a.itemName === itemName);

            if (typeof item === undefined) {
                throw new Error(`${mercName}:${itemName} not found while incrementing item.`);
            }

            if (item.activeTier > MaxItemTiers - item.tiers.length + 1) {
                item.activeTier--;
                item.costToMax = ItemUpgradeCosts.slice(item.activeTier).reduce((p, c) => p += c, 0);
            }
        },
        itemUnlock(mercName: string, itemName: string) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);
            const item = merc.equipment.find(i => i.itemName === itemName);

            if (item.unlock.startsWith("Level")) {
                merc.level = Number.parseInt(item.unlock.substring("Level ".length));
                item.unlocked = true;
            } else if (item.unlock.startsWith("Defeat")) {
                item.unlocked = true;
            }
        },
        taskIncrement(mercName: string) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);

            if (typeof merc === undefined) {
                throw new Error(`${mercName} not found while incrementing tasksCompleted.`)
            }
            if (merc.tasksCompleted < MaxCompletedTasks) {
                merc.tasksCompleted++;
                merc.equipment.filter(item => item.unlock.startsWith("Task")).forEach(item => {
                    const taskUnlock = Number.parseInt(item.unlock.substring("Task ".length));
                    item.unlocked = taskUnlock <= merc.tasksCompleted;
                })
            }
        },
        taskDecrement(mercName: string) {
            const merc = (this as State).mercenaries.find(m => m.mercName === mercName);

            if (typeof merc === undefined) {
                throw new Error(`${mercName} not found while decrementing tasksCompleted.`)
            }
            if (merc.tasksCompleted > 0) {
                merc.tasksCompleted--;
                merc.equipment.filter(item => item.unlock.startsWith("Task")).forEach(item => {
                    const taskUnlock = Number.parseInt(item.unlock.substring("Task ".length));
                    item.unlocked = taskUnlock <= merc.tasksCompleted;
                })
            }
        },
    }
})

export function HSMercsPlugin({ store }: PiniaPluginContext) {
    if (store.$id === MercStoreId) {
        store.$subscribe((_, state: State) => {
            localStorage.setItem(store.$id, JSON.stringify(state));
        })
    }
}