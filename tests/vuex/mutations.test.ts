import { expect } from 'chai';
import mutations from "../../src/store/mutations";
import { State } from '../../src/store/state';
import { SET_MERCENARIES } from '../../src/store/types';

describe('Mercenary Data Mutations', () => {
    it('sets mercenaries collection', () => {
        const state: State = { mercenaries: {} };

        mutations[SET_MERCENARIES](state, {
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

        expect(state.mercenaries).to.deep.equal({
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