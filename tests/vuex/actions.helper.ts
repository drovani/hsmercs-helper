import { DoneCallback, expect } from "vitest";
import { Action, Store } from "vuex";
import { State } from "../../src/store/state";

export const actionTestHelper = (action: Action<State, State>, actionPayload: any, store: Store<State>, expectedMutations: any[], done: DoneCallback) => {
    let count = 0;
    const commit = (type: string, payload: any) => {
        let mutation = expectedMutations[count];
        try {
            expect(mutation.type).to.equal(type);
            if (payload) {
                expect(mutation.payload).to.deep.equal(payload)
            }
            count++;
            if (count >= expectedMutations.length) {
                done();
            }
        } catch (error) {
            done(error);
        }
    };
    if (expectedMutations.length === 0) {
        expect(count).to.equal(0);
        done();
    } else {
        if ("handler" in action) {
            action.handler.call(store, { getters: store.getters, commit }, actionPayload);
        } else {
            action.call(store, { getters: store.getters, commit }, actionPayload);
        }
    }
};