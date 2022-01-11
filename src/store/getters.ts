import { MercCollection } from "../models/mercCollection";
import { State } from "./state";

export default {
    getMercenaries(state: State) : MercCollection {
        return state.mercenaries;
    }
}