export const Rarities = ["Rare", "Epic", "Legendary"] as const;
export type Rarity = typeof Rarities[number];
