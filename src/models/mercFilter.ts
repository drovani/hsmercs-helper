import { Rarity } from "./rarities";
import { Role } from "./roles";
import { Tribe } from "./tribes";

export default interface MercFilter {
    roles?: Role[],
    rarities?: Rarity[],
    tribes?: Tribe[],
    sort?: "AZ" | "ZA"
}