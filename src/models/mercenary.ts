import { Rarity } from "./rarities";
import { Role } from "./roles";
import { SpellSchool } from "./spellSchool";
import { Tribe } from "./tribes";

export default interface Mercenary {
    role: Role,
    rarity: Rarity,
    tribe: Tribe | null,
    attack: number,
    health: number,
    abilities: { [name: string]: MercAbility },
    equipment: { [name: string]: any },
    tasks: MercTask[]
}

export interface MercAbility {
    unlock: number,
    spell_school?: SpellSchool,
    description: string,
    speed?: number,
    cooldown?: number,
    tiers: any[],
    [name: string]: any
}

export interface MercTask {
    name: string,
    description: string,
    quote: string,
    ability?: string
}