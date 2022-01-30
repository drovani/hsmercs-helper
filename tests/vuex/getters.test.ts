import { beforeEach, describe, expect, it } from "vitest";
import MercFilter from "../../src/models/mercFilter";
import { AllianceTribes } from "../../src/models/tribes";
import getters from "../../src/store/getters";
import { State } from "../../src/store/state";
import { GET_MERCENARIES } from "../../src/store/types";
import { BlademasterSamuro, JainaProudmoore, KingMukla } from "../constants";

describe("Mercenary Data Getters", () => {
    let state: State;

    beforeEach(() => {
        state = {
            mercenaries: {
                "King Mukla": { ...KingMukla },
                "Blademaster Samuro": { ...BlademasterSamuro },
                "Jaina Proudmoore": { ...JainaProudmoore },
            },
        };
    });

    it("gets mercenaries collection", () => {
        const result = getters[GET_MERCENARIES](state)();

        expect(result).deep.equal({
            "King Mukla": KingMukla,
            "Blademaster Samuro": BlademasterSamuro,
            "Jaina Proudmoore": JainaProudmoore,
        });
    });

    it("filters mercs by single role", () => {
        const filter: MercFilter = {
            roles: ["Protector"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({ "King Mukla": KingMukla });
    });

    it("filters mercs by two roles", () => {
        const filter: MercFilter = {
            roles: ["Fighter", "Caster"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": BlademasterSamuro,
            "Jaina Proudmoore": JainaProudmoore,
        });
    });

    it("filters mercs by one rarity", () => {
        const filter: MercFilter = {
            rarities: ["Rare"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": BlademasterSamuro,
        });
    });

    it("filters mercs by two rarities", () => {
        const filter: MercFilter = {
            rarities: ["Epic", "Legendary"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "King Mukla": KingMukla,
            "Jaina Proudmoore": JainaProudmoore,
        });
    });

    it("filters mercs by one tribe", () => {
        const filter: MercFilter = {
            tribes: ["Beast"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "King Mukla": KingMukla,
        });
    });

    it("filters mercs by two tribes", () => {
        const filter: MercFilter = {
            tribes: ["Human", "Orc"],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": BlademasterSamuro,
            "Jaina Proudmoore": JainaProudmoore,
        });
    });

    it("filters mercs by faction array", () => {
        const filter: MercFilter = {
            tribes: [...AllianceTribes],
        };

        const result = getters[GET_MERCENARIES](state)(filter);

        expect(result).deep.equal({
            "Jaina Proudmoore": JainaProudmoore,
        });
    });

    it("sorts mercs alphabetically and reverse", () => {
        // validate that this test starts with an unordered list
        expect(Object.keys(state.mercenaries)).to.have.ordered.members(["King Mukla", "Blademaster Samuro", "Jaina Proudmoore"]);

        const filter: MercFilter = {
            sort: "AZ"
        };
        const resultaz = getters[GET_MERCENARIES](state)(filter);
        expect(Object.keys(resultaz)).to.have.ordered.members(["Blademaster Samuro", "Jaina Proudmoore", "King Mukla"]);

        filter.sort = "ZA";
        const resultza = getters[GET_MERCENARIES](state)(filter);
        expect(Object.keys(resultza)).to.have.ordered.members(["King Mukla", "Jaina Proudmoore", "Blademaster Samuro"]);
    })

});
