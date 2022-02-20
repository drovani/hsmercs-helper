import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useMercStore } from "../../src/stores/merc";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe('Mercenary Data Actions', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
        const store = useMercStore();
        store.$state = {
            mercenaries: {
                "King Mukla": { ...KingMukla },
                "Blademaster Samuro": { ...BlademasterSamuro },
                "Jaina Proudmoore": { ...JainaProudmoore },
            },
            collection: {}
        };
    })

    it('ability increment adds merc to collection when not already present', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.abilityIncrement("King Mukla", "Banana Frenzy");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(2);
    })

    it('ability decrement adds merc to collection when not already present, does not decrement', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.abilityDecrement("King Mukla", "Banana Frenzy");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].abilities["Banana Frenzy"]).to.equal(1);
    })

    it('item increment adds merc to collection when not already present', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.itemIncrement("King Mukla", "Refreshing Bananas");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(2);
    })
    it('item decrement adds merc to collection when not already present, does not decrement', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.itemDecrement("King Mukla", "Refreshing Bananas");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].equipment["Refreshing Bananas"]).to.equal(1);
    })
    it('task increment adds merc to collection when not already present', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.taskIncrement("King Mukla");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].tasksCompleted).to.equal(1);
    })
    it('task decrement adds merc to collection when not already present, does not decrement', () => {
        const store = useMercStore();
        expect(store.collection["King Mukla"]).to.be.undefined;

        store.taskDecrement("King Mukla");

        expect(store.collection["King Mukla"]).to.not.be.undefined;
        expect(store.collection["King Mukla"].tasksCompleted).to.equal(0);
    })
})