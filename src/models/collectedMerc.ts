export default interface CollectedMerc {
    collected: Boolean,
    tasksCompleted: number,
    itemEquipped?: string,
    level: number,
    abilities: {
        [name: string]: number
    },
    equipment: {
        [name: string]: number
    },
}