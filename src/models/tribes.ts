export const AllianceTribes = ["Draenei", "Dwarf", "Gnome", "High Elf", "Human", "Night Elf"] as const;
export const HordeTribes = ["Blood Elf", "Goblin", "Half-Orc", "Orc", "Tauren", "Troll", "Undead"] as const;
export const NeutralTribes = ["Beast", "Demon", "Dragon", "Elemental", "Murloc", "Pirate"] as const;

export type AllianceTribe = typeof AllianceTribes[number];
export type HordeTribe = typeof HordeTribes[number];
export type NeutralTribe = typeof NeutralTribes[number];
export type Tribe = AllianceTribe | HordeTribe | NeutralTribe;