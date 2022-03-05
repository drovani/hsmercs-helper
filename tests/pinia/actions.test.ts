import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { HydrateMercenary } from "../../src/common/mercenary";
import { MaxAbilityTiers, MaxItemTiers } from "../../src/models/mercenary";
import { useMercStore } from "../../src/stores/mercenaries";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe('mercStore Actions', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
        const store = useMercStore();
        store.$state = {
            mercenaries: [
                HydrateMercenary("King Mukla", KingMukla),
                HydrateMercenary("Blademaster Samuro", BlademasterSamuro),
                HydrateMercenary("Jaina Proudmoore", JainaProudmoore)
            ],
        }
    });



    it('ability increment increases activeTier', () => {
        const store = useMercStore();
        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(1);

        store.abilityIncrement("King Mukla", "Banana Frenzy");

        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(2);
    })
    it('ability increment does not increase activeTier when at max', () => {
        const store = useMercStore();
        store.getAbility("King Mukla", "Banana Frenzy").activeTier = MaxAbilityTiers;

        store.abilityIncrement("King Mukla", "Banana Frenzy");
        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(5);
    })
    it('ability decrement decreases activeTier', () => {
        const store = useMercStore();
        store.getAbility("King Mukla", "Banana Frenzy").activeTier = 4;

        store.abilityDecrement("King Mukla", "Banana Frenzy");

        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(3);
    })
    it('ability decrement does not decrease activeTier when at min', () => {
        const store = useMercStore();
        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(1);

        store.abilityDecrement("King Mukla", "Banana Frenzy");

        expect(store.getAbility("King Mukla", "Banana Frenzy").activeTier).to.equal(1);
    })


    it('item increment increases activeTier', () => {
        const store = useMercStore();
        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(1);

        store.itemIncrement("King Mukla", "Refreshing Bananas");

        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(2);
    })
    it('item increment does not increase activeTier when at max', () => {
        const store = useMercStore();
        store.getItem("King Mukla", "Refreshing Bananas").activeTier = MaxItemTiers;

        store.itemIncrement("King Mukla", "Refreshing Bananas");
        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(4);
    })
    it('item decrement decreases activeTier', () => {
        const store = useMercStore();
        store.getItem("King Mukla", "Refreshing Bananas").activeTier = 4;

        store.itemDecrement("King Mukla", "Refreshing Bananas");

        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(3);
    })
    it('item decrement does not decrease activeTier when at min', () => {
        const store = useMercStore();
        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(1);

        store.itemDecrement("King Mukla", "Refreshing Bananas");

        expect(store.getItem("King Mukla", "Refreshing Bananas").activeTier).to.equal(1);
    })
    it('item decrement does not decrease activeTier when at min for partial item', () => {
        const store = useMercStore();
        expect(store.getItem("King Mukla", "Radioactive Bananas").activeTier).to.equal(3);

        store.itemDecrement("King Mukla", "Radioactive Bananas");

        expect(store.getItem("King Mukla", "Radioactive Bananas").activeTier).to.equal(3);
    })
})