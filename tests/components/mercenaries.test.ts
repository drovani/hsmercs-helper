import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import Mercenaries from "../../src/components/Mercenaries.vue";
import { State } from "../../src/store/state";

describe("Mercenaries.vue component", () => {
    it('gets mercenaries collection', () => {
        const state: State = {
            mercenaries: {
                "Alexstrasza": {
                    role: "Protector",
                    rarity: "Rare",
                    tribe: "Dragon",
                    attack: 10,
                    health: 80,
                    abilities: {},
                    equipment: {},
                    tasks: []
                }
            }
        };
        const mercvue = shallowMount(Mercenaries, {});

        const result = mercvue.vm.getMercenaries();

        expect(result).deep.equal(state.mercenaries);
    });

})