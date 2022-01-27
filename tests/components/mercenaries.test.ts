import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Mercenaries from "../../src/components/Mercenaries.vue";
import { store } from "../../src/store";
import { GET_MERCENARIES } from "../../src/store/types";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe("Mercenaries.vue component", () => {
    let mercvue: typeof Mercenaries;

    beforeEach(() => {
        store.state.mercenaries = {
            "King Mukla": { ...KingMukla },
            "Blademaster Samuro": { ...BlademasterSamuro },
            "Jaina Proudmoore": { ...JainaProudmoore },
        };
        mercvue = shallowMount(Mercenaries, {
            global: {
                plugins: [store]
            }
        });
    })

    it('gets mercenaries collection', () => {
        const result = mercvue.vm[GET_MERCENARIES]();

        expect(result).to.eql({
            "King Mukla": KingMukla,
            "Blademaster Samuro": BlademasterSamuro,
            "Jaina Proudmoore": JainaProudmoore
        })
    });
    it('updates filters by role', () => {
        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Fighter", "Caster"]);

        mercvue.vm.filterRole('Protector');

        expect(mercvue.vm.filter.roles).to.eql(["Protector"]);
    });
    it('showAllMercenaries resets filter to view all', () => {
        mercvue.vm.filter = {};
        expect(mercvue.vm.filter.roles).to.be.undefined;

        mercvue.vm.showAllMercenaries();

        expect(mercvue.vm.filter.roles).to.have.members(["Fighter", "Protector", "Caster"]);
    });
    it('toggleRole enables/disables a role', () => {
        expect(mercvue.vm.filter.roles).to.have.members(["Fighter", "Protector", "Caster"]);

        mercvue.vm.toggleRole("Fighter");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Caster"]);

        mercvue.vm.toggleRole("Caster");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector"]);

        mercvue.vm.toggleRole("Fighter");

        expect(mercvue.vm.filter.roles).to.have.members(["Protector", "Fighter"]);
    })
})