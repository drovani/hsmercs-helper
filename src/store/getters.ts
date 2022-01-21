import { MercCollection } from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import { State } from "./state";

export default {
  getMercenaries: (state: State) => (filter?: MercFilter): MercCollection => {
    if (filter === undefined) {
      return state.mercenaries;
    }

    let mercs = Object.entries(state.mercenaries);

    if (Array.isArray(filter.roles)) {
      mercs = mercs.filter(m => filter.roles.find(r => r === m[1].role));
    }
    if (Array.isArray(filter.rarities)) {
      mercs = mercs.filter(m => filter.rarities.find(r => r === m[1].rarity));
    }
    if (Array.isArray(filter.tribes)) {
      mercs = mercs.filter(m => filter.tribes.find(t => t === m[1].tribe));
    }

    return Object.fromEntries(mercs);
  }
}