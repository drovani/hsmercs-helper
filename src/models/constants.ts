export const AbilityUpgradeCosts = [0, 50, 125, 150, 150] as const;
export const ItemUpgradeCosts = [0, 100, 150, 175] as const;

export const Rarities = ["Rare", "Epic", "Legendary"] as const;
export type Rarity = typeof Rarities[number];

export const Roles = ["Protector", "Fighter", "Caster"] as const;
export type Role = typeof Roles[number];

export const AllianceTribes = ["Draenei", "Dwarf", "Gnome", "High Elf", "Human", "Night Elf"] as const;
export const HordeTribes = ["Blood Elf", "Goblin", "Half-Orc", "Orc", "Tauren", "Troll", "Undead"] as const;
export const NeutralTribes = ["Beast", "Demon", "Dragon", "Elemental", "Murloc", "Pirate"] as const;
export const Tribes = [...AllianceTribes, ...HordeTribes, ...NeutralTribes] as const;

export type AllianceTribe = typeof AllianceTribes[number];
export type HordeTribe = typeof HordeTribes[number];
export type NeutralTribe = typeof NeutralTribes[number];
export type Tribe = typeof Tribes[number];

export const SpellSchools = ["Arcane", "Fel", "Fire", "Frost", "Holy", "Nature", "Shadow"] as const;
export type SpellSchool = typeof SpellSchools[number];