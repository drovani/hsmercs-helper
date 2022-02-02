import { DoneCallback, expect } from "vitest";
import getters from "../../src/store/getters";
import { State } from "../../src/store/state";

export const actionTestHelper = (action: Function, actionPayload: any, state: State, expectedMutations: any[], done: DoneCallback) => {
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
        action({ commit, state, getters }, actionPayload);
    }
};