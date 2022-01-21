import { expect } from 'chai';
import Mercenary from '../../src/models/mercenary';
import MercFilter from '../../src/models/mercFilter';
import { AllianceTribes } from '../../src/models/tribes';
import getters from "../../src/store/getters";
import { State } from '../../src/store/state';

describe('Mercenary Data Getters', () => {

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

        const result = getters.getMercenaries(state)();

        expect(result).deep.equal({
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
        });
    });

    const mukla: Mercenary = {
        role: "Protector",
        rarity: "Epic",
        tribe: "Beast",
        attack: 10,
        health: 73,
        abilities: {},
        equipment: {},
        tasks: []
    };
    const samuro: Mercenary = {
        role: "Fighter",
        rarity: "Rare",
        tribe: "Orc",
        attack: 10,
        health: 66,
        abilities: {},
        equipment: {},
        tasks: []
    };
    const jaina: Mercenary = {
        role: "Caster",
        rarity: "Legendary",
        tribe: "Human",
        attack: 7,
        health: 72,
        abilities: {},
        equipment: {},
        tasks: []
    };

    it('filters mercs by single role', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            roles: ['Protector']
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({ "King Mukla": mukla });

    });

    it('filters mercs by two roles', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            roles: ["Fighter", "Caster"]
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": samuro,
            "Jaina Proudmoore": jaina
        })
    });

    it('filters mercs by one rarity', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            rarities: ["Rare"]
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": samuro,
        })
    });

    it('filters mercs by two rarities', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            rarities: ["Epic", "Legendary"]
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "King Mukla": mukla,
            "Jaina Proudmoore": jaina
        })
    });

    it('filters mercs by one tribe', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            tribes: ["Beast"]
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "King Mukla": mukla,
        })
    });

    it('filters mercs by two tribes', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            tribes: ["Human", "Orc"]
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "Blademaster Samuro": samuro,
            "Jaina Proudmoore": jaina
        })
    });

    it('filters mercs by faction array', () => {
        const state: State = {
            mercenaries: {
                "King Mukla": mukla,
                "Blademaster Samuro": samuro,
                "Jaina Proudmoore": jaina
            }
        };
        const filter: MercFilter = {
            tribes: AllianceTribes
        };

        const result = getters.getMercenaries(state)(filter);

        expect(result).deep.equal({
            "Jaina Proudmoore": jaina
        })
    });

});