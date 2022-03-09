import { Rarity, Role, SpellSchool, Tribe } from "./constants";

export const MaxItemTiers = 4;
export const MaxAbilityTiers = 5;
export const MaxCompletedTasks = 18;

export interface Mercenary {
    mercName: string;
    role: Role;
    rarity: Rarity;
    tribe: Tribe | null;
    attack: number;
    health: number;
    abilities: MercAbility[];
    equipment: MercItem[];
    tasks: MercTask[];

    level: number;
    tasksCompleted: number;
    collected: boolean;
    itemEquipped?: string;
    costToMax: number;
}

export interface MercAbility {
    abilityName: string;
    unlock: number;
    spell_school?: SpellSchool;
    description: string;
    speed?: number;
    cooldown?: number;
    tiers: AbilityTier[];

    activeTier: number;
    unlocked: boolean;
    costToMax: number;
}

export interface MercItem {
    itemName: string;
    unlock: string;
    position: "left" | "middle" | "right";
    affects?: string | string[];
    description: string;
    modifier?: any;
    tiers: any[];

    activeTier: number;
    unlocked: boolean;
    costToMax: number;
}

export interface MercTask {
    name: string;
    description: string;
    quote: string;
    ability?: string
}

interface AbilityTier {
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