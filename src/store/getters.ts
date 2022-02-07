import CollectedMerc from "../models/collectedMerc";
import MercCollection from "../models/mercCollection";
import MercFilter from "../models/mercFilter";
import MercLibrary from "../models/mercLibrary";
import { State } from "./state";
import { GET_COLLECTED_MERC, GET_MERC_COLLECTION, GET_MERC_LIBRARY } from "./types";

export default {
  [GET_MERC_LIBRARY]: (state: State) => (filter?: MercFilter): MercLibrary => {
    if (filter === undefined) {
      return state.mercenaries;
    }

    let mercs = Object.entries(state.mercenaries);

    if (Array.isArray(filter.roles)) {
      mercs = mercs.filter(m => filter.roles.includes(m[1].role));
    }
    if (Array.isArray(filter.rarities)) {
      mercs = mercs.filter(m => filter.rarities.includes(m[1].rarity));
    }
    if (Array.isArray(filter.tribes)) {
      mercs = mercs.filter(m => filter.tribes.includes(m[1].tribe));
    }

    if (filter.sort !== undefined) {
      mercs.sort((a, b) => a[0] < b[0] ? -1 : 1);
      if (filter.sort === "ZA") {
        mercs.reverse();
      }
    }

    return Object.fromEntries(mercs);
  },
  [GET_MERC_COLLECTION]:(state: State) : MercCollection => {
    return state.collection;
  },
  [GET_COLLECTED_MERC]: (state: State) => (mercName: string): CollectedMerc => {
    return state.collection[mercName];
  }
}