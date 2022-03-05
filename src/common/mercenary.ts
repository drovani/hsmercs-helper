import { AbilityUpgradeCosts, ItemUpgradeCosts, Rarity, Role, SpellSchool, Tribe } from "../models/constants";
import { CollectedMerc } from "../models/mercCollection";
import { MaxItemTiers, MercAbility, Mercenary, MercItem } from "../models/mercenary";
import { MercAbilityDto, MercenaryDto, MercItemDto } from "../models/mercLibrary";

export function HydrateMercenary(merc: string | Mercenary, mercDto?: MercenaryDto): Mercenary {
    const data = typeof merc === 'string' ? mercDto : merc;

    const hydrate: Omit<Mercenary, "costToMax"> = {
        mercName: '',
        role: data.role as Role,
        rarity: data.rarity as Rarity,
        tribe: data.tribe as Tribe,
        attack: data.attack,
        health: data.health,
        abilities: [],
        equipment: [],
        tasks: [],
        collected: false,
        level: 0,
        tasksCompleted: 0
    };

    if (typeof merc === "object") {
        hydrate.collected = merc.collected;
        hydrate.level = merc.level;
        hydrate.tasksCompleted = merc.tasksCompleted;
        hydrate.mercName = merc.mercName;
    } else {
        hydrate.mercName = merc;
    }

    if (Array.isArray(data.abilities)) {
        for (const ability of data.abilities) {
            hydrate.abilities.push(HydrateAbility(ability, null, { level: hydrate.level }))
        }
    } else {
        for (const abilityName in data.abilities) {
            hydrate.abilities.push(HydrateAbility(abilityName, data.abilities[abilityName], { level: hydrate.level }));
        }
    }

    if (Array.isArray(data.equipment)) {
        for (const item of data.equipment) {
            hydrate.equipment.push(HydrateItem(item, null, { tasksCompleted: hydrate.tasksCompleted, level: hydrate.level }));
        }
    } else {
        for (const itemName in data.equipment) {
            hydrate.equipment.push(HydrateItem(itemName, data.equipment[itemName], { tasksCompleted: hydrate.tasksCompleted, level: hydrate.level }));
        }
    }

    for (const task of data.tasks) {
        hydrate.tasks.push({
            description: task.description,
            name: task.name,
            quote: task.quote,
            ability: task.ability
        });
    }

    return {
        ...hydrate,
        costToMax: hydrate.abilities.reduce((p, c) => p += c.costToMax, 0)
            + hydrate.equipment.reduce((p, c) => p += c.costToMax, 0)
    };
}

function HydrateAbility(ability: string | MercAbility, abilityDto?: MercAbilityDto, merc?: Pick<Mercenary, "level">): MercAbility {
    const data = typeof ability === 'string' ? abilityDto : ability;

    const hydrate: Omit<MercAbility, "costToMax"> = {
        abilityName: typeof ability === 'string' ? ability : ability.abilityName,
        unlock: data.unlock,
        spell_school: data.spell_school as SpellSchool,
        speed: data.speed,
        description: data.description,
        tiers: [...data.tiers],
        cooldown: data.cooldown,
        activeTier: typeof ability === 'string' ? 1 : ability.activeTier,
        unlocked: merc?.level ? merc.level >= data.unlock : false
    };

    return {
        ...hydrate,
        costToMax: AbilityUpgradeCosts.slice(hydrate.activeTier).reduce((p, c) => p += c, 0)
    };

    // return new Proxy<MercAbility>(hydrate, {
    //     get(target, prop, receiver) {
    //         if (prop === "costToMax") {
    //             return AbilityUpgradeCosts.slice(target.activeTier).reduce((c, p) => (c += p), 0);
    //         }

    //         const value = Reflect.get(target, prop, receiver);
    //         return typeof value === 'function' ? value.bind(target) : value;
    //     }
    // })
}
function HydrateItem(item: string | MercItem, itemDto?: MercItemDto, merc?: Pick<Mercenary, "tasksCompleted" | "level">): MercItem {
    const data = typeof item === 'string' ? itemDto : item;

    const tiers = typeof item === 'string' ?
        [...(itemDto.tiers ?? [itemDto.modifier ? { modifier: itemDto.modifier } : {}])]
        : item.tiers;

    const hydrate: Omit<MercItem, "costToMax"> = {
        itemName: typeof item === 'string' ? item : item.itemName,
        unlock: data.unlock,
        position: data.position as "left" | "middle" | "right",
        affects: data.affects,
        description: data.description,
        tiers: tiers,
        activeTier: typeof item === 'string' ? MaxItemTiers - tiers.length + 1 : item.activeTier,
        unlocked: typeof item === "string" ? false : item.unlocked
    };

    if (merc?.tasksCompleted && hydrate.unlock.startsWith("Task ")) {
        hydrate.unlocked = Number.parseInt(hydrate.unlock.substring("Task ".length)) <= merc.tasksCompleted;
    } else if (merc?.level && hydrate.unlock.startsWith("Level ")) {
        hydrate.unlocked = Number.parseInt(hydrate.unlock.substring("Level ".length)) <= merc.level;
    }


    return {
        ...hydrate,
        costToMax: ItemUpgradeCosts.slice(hydrate.activeTier).reduce((p, c) => p += c, 0),
    };

    // return new Proxy<MercItem>(hydrate, {
    //     get(target, prop, receiver) {
    //         if (prop === "costToMax") {
    //             return ItemUpgradeCosts.slice(target.activeTier).reduce((p, c) => (c += p), 0);
    //         }

    //         const value = Reflect.get(target, prop, receiver);
    //         return typeof value === 'function' ? value.bind(target) : value;
    //     }
    // })
}



export function ExtractCollectedMerc(merc: Mercenary): CollectedMerc {
    return {
        collected: merc.collected,
        level: merc.level,
        tasksCompleted: merc.tasksCompleted,
        itemEquipped: merc.itemEquipped,
        abilities: merc.abilities.reduce((p, c) => { p[c.abilityName] = c.activeTier; return p; }, {}),
        equipment: merc.equipment.reduce((p, c) => {
            if (c.unlock.startsWith("Level") || c.unlock.startsWith("Task")) {
                p[c.itemName] = c.activeTier;
            } else {
                p[c.itemName] = {
                    activeTier: c.activeTier,
                    unlocked: c.unlocked
                }
            }
            return p;
        }, {})
    }
}

export function ApplyCollectedMerc(merc: Mercenary, data: CollectedMerc) {
    if (typeof merc === 'undefined') {
        throw new Error('merc parameter is undefined.')
    } else {
        merc.collected = data.collected;
        merc.level = data.level;
        merc.tasksCompleted = data.tasksCompleted;
        merc.itemEquipped = data.itemEquipped;
        merc.abilities.forEach(a => a.activeTier = data.abilities[a.abilityName]);
        merc.equipment.forEach(i => {
            const item = data.equipment[i.itemName];
            if (typeof item === 'number') {
                i.activeTier = item;
                if (i.unlock.startsWith("Task")) {
                    i.unlocked = Number.parseInt(i.unlock.substring("Task ".length)) <= merc.tasksCompleted;
                } else if (i.unlock.startsWith("Level")) {
                    i.unlocked = Number.parseInt(i.unlock.substring("Level ".length)) <= merc.level;
                }
            } else {
                i.activeTier = item.activeTier;
                i.unlocked = item.unlocked;
            }
        });
    }
}