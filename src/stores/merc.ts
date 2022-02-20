import { defineStore } from "pinia";
import CollectedMerc from "../models/collectedMerc";
import MercCollection from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import MercLibrary from "../models/mercLibrary";

interface State {
    mercenaries: MercLibrary;
    collection: MercCollection;
}

export const useMercStore = defineStore('merc', {
    state: (): State => {
        return {
            mercenaries: {},
            collection: {}
        }
    },
    getters: {
        filteredLibrary: (state) => {
            return (filter?: MercFilter): MercLibrary => {
                if (filter === undefined) {
                    return state.mercenaries;
                }

                let mercs = Object.entries(state.mercenaries);

                if (Array.isArray(filter.roles)) {
                    mercs = mercs.filter(m => filter.roles.includes(m[1].role));
                }
                if (Array.isArray(filter.rarities)) {
                    mercs = mercs.filter(m => filter.rarities.includes(m[1].rarity));
                }
                if (Array.isArray(filter.tribes)) {
                    mercs = mercs.filter(m => filter.tribes.includes(m[1].tribe));
                }

                if (filter.sort !== undefined) {
                    if (filter.sort.field === "name") {
                        mercs.sort((a, b) => a[0] < b[0] ? -1 : 1);
                    } else if (filter.sort.field === "tasks") {
                        mercs.sort((a, b) => (state.collection[a[0]]?.tasksCompleted ?? -1) - (state.collection[b[0]]?.tasksCompleted ?? -1));
                    }

                    if (filter.sort.direction === "descending") {
                        mercs.reverse();
                    }
                }

                return Object.fromEntries(mercs);
            }
        },
    },
    actions: {
        setMercCollection(payload: File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target.result === "string") {
                    const mercCollection = JSON.parse(e.target.result);
                    this.collection = mercCollection.collection;
                }
            }
            reader.readAsText(payload);
        },
        setMercLibrary(payload: any) {
            this.mercenaries = payload as MercLibrary;
        },
        addMercToCollection(mercName: string, mercCollected: CollectedMerc | boolean = false) {
            if (this.collection[mercName]) {
                if (typeof mercCollected === "boolean") {
                    this.collection[mercName].collected = mercCollected;
                } else {
                    this.collection[mercName] = { ...mercCollected }
                }
            } else {
                let merc: CollectedMerc;
                if (typeof mercCollected === "boolean") {
                    const fromLibrary = this.mercenaries[mercName];
                    const abilities = Object.entries(fromLibrary.abilities).reduce((p, c) => { p[c[0]] = 1; return p }, {});
                    const equipment = Object.entries(fromLibrary.equipment).reduce((p, c) => { p[c[0]] = 4 - (c[1].tiers?.length ?? 1) + 1; return p; }, {});
                    merc = {
                        level: 30,
                        collected: mercCollected,
                        tasksCompleted: 0,
                        abilities,
                        equipment,
                        itemEquipped: null
                    };
                } else {
                    merc = { ...mercCollected };
                }
                this.collection[mercName] = merc;
            }
        },
        abilityIncrement(mercName: string, abilityName: string) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            if (this.collection[mercName].abilities[abilityName] < 5) {
                this.collection[mercName].abilities[abilityName]++;
            }
        },
        abilityDecrement(mercName: string, abilityName: string) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            if (this.collection[mercName].abilities[abilityName] > 1) {
                this.collection[mercName].abilities[abilityName]--;
            }
        },
        itemIncrement(mercName: string, itemName: string) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            if (this.collection[mercName].equipment[itemName] < 5) {
                this.collection[mercName].equipment[itemName]++;
            }
        },
        itemDecrement(mercName: string, itemName: string) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            const numTiers = this.mercenaries[mercName].equipment[itemName].tiers?.length ?? 1;
            if (this.collection[mercName].equipment[itemName] > 4 - numTiers + 1) {
                this.collection[mercName].equipment[itemName]--;
            }
        },
        taskIncrement(mercName) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            if (this.collection[mercName].tasksCompleted < 18) {
                this.collection[mercName].tasksCompleted++;
            }
        },
        taskDecrement(mercName) {
            if (!this.collection[mercName]) {
                this.addMercToCollection(mercName);
            }
            if (this.collection[mercName].tasksCompleted > 0) {
                this.collection[mercName].tasksCompleted--;
            }
        },
    }
})