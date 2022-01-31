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
    tasks: any[]
}

export interface Collected {
    collected: Boolean,
    tasksCompleted: number,
    itemEquipped: string,
    level: number,
    abilities: {
        [name: string]: number
    },
    equipment: {
        [name: string]: number
    },
}