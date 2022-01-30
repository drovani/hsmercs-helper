export const Roles = ["Protector", "Fighter", "Caster"] as const;
export type Role = typeof Roles[number];
