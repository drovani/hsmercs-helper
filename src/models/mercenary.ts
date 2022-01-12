
export interface Mercenary {
    role: "Protector" | "Fighter" | "Caster",
    rarity: "Rare" | "Epic" | "Legendary",
    race?: "Beast" | "Blood Elf" | "Demon" | "Draenei" | "Dragon" | "Dwarf" | "Elemental" | "Gnome" | "Half-Orc" | "High Elf" | "Human" | "Murloc" | "Night Elf" | "Orc" | "Pirate" | "Tauren" | "Troll" | "Undead"
    attack: number,
    health: number,
    abilities: { [name: string]: any },
    equipment: { [name: string]: any },
    tasks: any[]
}