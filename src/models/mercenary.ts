import { Rarity } from "./rarities";
import { Role } from "./roles";
import { Tribe } from "./tribes";

export default interface Mercenary {
    role: Role,
    rarity: Rarity,
    tribe: Tribe | null,
    attack: number,
    health: number,
    abilities: { [name: string]: any },
    equipment: { [name: string]: any },
    tasks: MercTask[]
}

export interface MercTask {
    name: string,
    description: string,
    quote: string,
    ability?: string
}