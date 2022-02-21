export interface MercCollection {
    [name: string]: CollectedMerc;
}

export interface CollectedMerc {
    collected: boolean
    tasksCompleted: number
    itemEquipped?: string
    level: number
    abilities: {
        [name: string]: number
    }
    equipment: {
        [name: string]: number
    }
}