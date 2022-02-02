import { beforeEach, describe, expect, it } from "vitest";
import actions from "../../src/store/actions";
import { State } from "../../src/store/state";
import { ABILITY_DECREMENT, ABILITY_INCREMENT, ADD_MERC_TO_COLLECTION, ITEM_DECREMENT, ITEM_INCREMENT } from "../../src/store/types";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";
import { actionTestHelper } from "./actions.helper";

describe('Mercenary Data Actions', () => {
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

    it.skip('ability increment adds merc to collection when not already present', (done) => {
        const expectedMutations = [
            {
                type: ABILITY_INCREMENT,
                payload: {
                    mercName: "King Mukla",
                    abilityName: "Banana Frenzy"
                }
            },
            {
                type: ADD_MERC_TO_COLLECTION,
                payload: { mercName: "King Mukla" }
            },

        ];
debugger;
        actionTestHelper(actions[ABILITY_INCREMENT],
            { mercName: "King Mukla", abilityName: "Banana Frenzy" },
            state,
            expectedMutations,
            done);
    })
    it.skip('ability decrement adds merc to collection when not already present', () => {
        expect(state.collection["King Mukla"]).to.be.undefined;

        actions[ABILITY_DECREMENT](state, { mercName: "King Mukla", abilityName: "Banana Frenzy" });

        expect(state.collection["King Mukla"]).to.not.be.undefined;
        expect(state.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(1);
    })
    it.skip('item increment adds merc to collection when not already present', () => {
        expect(state.collection["King Mukla"]).to.be.undefined;

        actions[ITEM_INCREMENT](state, { mercName: "King Mukla", itemName: "Refreshing Bananas" });

        expect(state.collection["King Mukla"]).to.not.be.undefined;
        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(2);
    })
    it.skip('item decrement adds merc to collection when not already present', () => {
        expect(state.collection["King Mukla"]).to.be.undefined;

        actions[ITEM_DECREMENT](state, { mercName: "King Mukla", itemName: "Refreshing Bananas" });

        expect(state.collection["King Mukla"]).to.not.be.undefined;
        expect(state.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(1);
    })
})