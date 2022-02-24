import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, fn, it } from "vitest";
import { useRouter } from "vue-router";
import Mercenaries from "../../src/components/Mercenaries.vue";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe.skip("Mercenaries.vue component", () => {
    let mercvue: typeof Mercenaries;

    beforeEach(() => {
        mercvue = shallowMount(Mercenaries, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        mercenaries: {
                            "King Mukla": { ...KingMukla },
                            "Blademaster Samuro": { ...BlademasterSamuro },
                            "Jaina Proudmoore": { ...JainaProudmoore },
                        }
                    }, createSpy: fn
                }), useRouter()]
            }
        });
    })

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
        expect(mercvue.vm.filter.rarites).to.have.members(["Rare", "Epic", "Legendary"])
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