import { beforeEach, describe, expect, it } from "vitest";
import CollectedMerc from "../../src/models/collectedMerc";
import mutations from "../../src/store/mutations";
import { State } from '../../src/store/state';
import { ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, ITEM_DECREMENT, ITEM_INCREMENT, SET_MERC_LIBRARY } from '../../src/store/types';
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe('Mercenary Data Mutations', () => {
    let state: State;

    beforeEach(() => {
        state = {
            mercenaries: {
                "King Mukla": { ...KingMukla },
                "Blademaster Samuro": { ...BlademasterSamuro },
                "Jaina Proudmoore": { ...JainaProudmoore },
            },
            collection: {}
        };
    })


    it('sets mercenary library', () => {
        const emptyState: State = {
            mercenaries: {},
            collection: {}
        };

        mutations[SET_MERC_LIBRARY](emptyState, {
            "King Mukla": { ...KingMukla }
        });

        expect(emptyState.mercenaries).deep.equal({
            "King Mukla": KingMukla
        });
    });

    it('adds collected merc to collection', () => {
        const collectedMerc: CollectedMerc = {
            collected: true,
            tasksCompleted: 10,
            itemEquipped: "Refreshing Bananas",
            level: 30,
            abilities: {
                "Banana Frenzy": 2,
                "Dinner Time": 4,
                "Primal Power": 3
            }, equipment: {
                "Refreshing Bananas": 2,
                "Radioactive Bananas": 3,
                "Mukla's Big Brother": 4
            }
        };

        mutations[ADD_MERC_TO_COLLECTION](state, "King Mukla", { ...collectedMerc });

        expect(state.collection["King Mukla"]).deep.equals(collectedMerc);
    });

    it('adds empty collected merc to collection', () => {
        const collectedMerc: CollectedMerc = {
            collected: true,
            tasksCompleted: 0,
            itemEquipped: null,
            level: 30,
            abilities: {
                "Banana Frenzy": 1,
                "Dinner Time": 1,
                "Primal Power": 1
            }, equipment: {
                "Refreshing Bananas": 1,
                "Radioactive Bananas": 3,
                "Mukla's Big Brother": 1
            }
        };

        mutations[ADD_MERC_TO_COLLECTION](state, "King Mukla");

        expect(state.collection["King Mukla"]).deep.equals(collectedMerc);
    });
});
describe('Collected Ability & Equipment Mutations', () => {
    let state: State;

    beforeEach(() => {
        state = {
            mercenaries: {
                "King Mukla": { ...KingMukla },
                "Jaina Proudmoore": { ...JainaProudmoore },
                "Blademaster Samuro": { ...BlademasterSamuro }
            },
            collection: {
                "King Mukla": {
                    collected: true,
                    tasksCompleted: 10,
                    itemEquipped: "Refreshing Bananas",
                    level: 30,
                    abilities: {
                        "Banana Frenzy": 2,
                        "Dinner Time": 1,
                        "Primal Power": 5
                    }, equipment: {
                        "Refreshing Bananas": 2,
                        "Radioactive Bananas": 3,
                        "Mukla's Big Brother": 4
                    }
                }
            }
        }
    })

    it('increments ability', () => {
        expect(state.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(2);

        mutations[ABILITY_INCREMENT](state, "King Mukla", "Banana Frenzy");

        expect(state.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(3);
    })
    it('will not increment ability above 5', () => {
        expect(state.collection["King Mukla"].abilities["Primal Power"]).to.equal(5);

        mutations[ABILITY_INCREMENT](state, "King Mukla", "Primal Power");

        expect(state.collection["King Mukla"].abilities["Primal Power"]).to.equal(5);
    })
    it('decrements ability', () => {
        expect(state.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(2);

        mutations[ABILITY_DECREMENT](state, "King Mukla", "Banana Frenzy");

        expect(state.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(1);
    })
    it('will not decrement ability below 1', () => {
        expect(state.collection["King Mukla"].abilities["Dinner Time"]).to.equal(1);

        mutations[ABILITY_DECREMENT](state, "King Mukla", "Dinner Time");

        expect(state.collection["King Mukla"].abilities["Dinner Time"]).to.equal(1);
    })

    it('increments item', () => {
        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(2);

        mutations[ITEM_INCREMENT](state, "King Mukla", "Refreshing Bananas");

        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(3);
    })
    it('will not increment item above 4', () => {
        expect(state.collection["King Mukla"].equipment["Mukla's Big Brother"]).to.equal(4);

        mutations[ITEM_INCREMENT](state, "King Mukla", "Mukla's Big Brother");

        expect(state.collection["King Mukla"].equipment["Mukla's Big Brother"]).to.equal(4);
    })
    it('decrements item', () => {
        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(2);

        mutations[ITEM_DECREMENT](state, "King Mukla", "Refreshing Bananas");

        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(1);
    })
    it('will not decrement item with 4 tiers below 1', () => {
        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(2);

        mutations[ITEM_DECREMENT](state, "King Mukla", "Refreshing Bananas");
        mutations[ITEM_DECREMENT](state, "King Mukla", "Refreshing Bananas");

        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(1);
    })
    it('will not decrement item with 2 tiers below 3', () => {
        expect(state.collection["King Mukla"].equipment["Radioactive Bananas"]).to.equal(3);

        mutations[ITEM_DECREMENT](state, "King Mukla", "Radioactive Bananas");

        expect(state.collection["King Mukla"].equipment["Radioactive Bananas"]).to.equal(3);
    })
})