import { Rarity, Role, SpellSchool, Tribe } from "./constants";

export interface MercLibrary {
    [name: string]: MercenaryDto;
}

export interface MercenaryDto {
    alias?: string | string[]
    role: Role | string
    rarity: Rarity | string
    tribe?: Tribe | string
    attack: number
    health: number
    abilities: { [name: string]: MercAbilityDto }
    equipment: { [name: string]: MercItemDto }
    tasks: MercTaskDto[],
    itemEquipped?: string
}

export interface MercAbilityDto {
    unlock: number
    spell_school?: SpellSchool | string
    description?: string
    speed?: number
    cooldown?: number
    tiers: MercAbilityTierDto[]
    summon?: MercSummonDto,
    [name: string]: any
}

export interface MercItemDto {
    unlock: string
    position: "left" | "middle" | "right" | string
    description: string
    affects?: string | string[]
    tiers?: any[]
    modifier?: any
    [name: string]: any
}

export interface MercTaskDto {
    name: string
    description: string
    quote: string
    ability?: string
}

interface MercAbilityTierDto {
    speed?: number,
    description?: string | number | (string | number | null)[] | {
        replacement: string
    },
    summon?: {
        description?: string | number | (string | number | null)[],
        attack?: number,
        health?: number
    }
    choose?: any[]
}

interface MercSummonDto {
    name: string,
    tribe?: Tribe | string,
    description: string,
    attack?: number,
    health?: number
}