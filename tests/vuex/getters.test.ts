import { expect } from 'chai';
import getters from "../../src/store/getters";
import { State } from '../../src/store/state';

describe('Mercenary Data Getters', () => {
    it('gets mercenaries collection', () => {
        const state: State = {
            mercenaries: {
                "Alexstrasza": {
                    role: "Protector",
                    rarity: "Rare",
                    race: "Dragon",
                    attack: 10,
                    health: 80,
                    abilities: {},
                    equipment: {},
                    tasks: []
                }
            }
        };

        const result = getters.getMercenaries(state);

        expect(result).to.deep.equal({
            "Alexstrasza": {
                role: "Protector",
                rarity: "Rare",
                race: "Dragon",
                attack: 10,
                health: 80,
                abilities: {},
                equipment: {},
                tasks: []
            }
        });
    });
});