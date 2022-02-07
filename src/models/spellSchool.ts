export const SpellSchools = ["Arcane", "Fel", "Fire", "Frost", "Holy", "Nature", "Shadow"] as const;
export type SpellSchool = typeof SpellSchools[number];