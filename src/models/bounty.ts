import { Role } from "./constants"

export interface Bounty{
    name: string,
    role: Role | string,
    levels?: number[],
    rewards: string[]
}