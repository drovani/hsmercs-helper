import { expect } from 'chai';
import mercenaries from '../src/static/mercenaries.json';
import { store } from '../src/store';
import { SET_MERCENARIES } from '../src/store/types';

describe('Vuex Store tests', () => {

    it('sets mercenaries data', () => {
        store.dispatch(SET_MERCENARIES, mercenaries.mercenaries);

        expect(store.state.mercenaries).to.be.an("object");
        expect(store.state.mercenaries['Alexstrasza'].role).to.equal("Protector");
    });
});