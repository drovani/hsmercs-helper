import { AbilityUpgradeCosts, ItemUpgradeCosts, Rarity, Role, SpellSchool, Tribe } from "../models/constants";
import { CollectedMerc } from "../models/mercCollection";
import { MaxItemTiers, MercAbility, Mercenary, MercItem } from "../models/mercenary";
import { MercAbilityDto, MercenaryDto, MercItemDto } from "../models/mercLibrary";

export function HydrateMercenary(merc: string | Mercenary, mercDto?: MercenaryDto): Mercenary {
    const data = typeof merc === 'string' ? mercDto : merc;

    const hydrate: Mercenary = {
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
        costToMax: -1,
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
            hydrate.abilities.push(HydrateAbility(ability))
        }
    } else {
        for (const abilityName in data.abilities) {
            hydrate.abilities.push(HydrateAbility(abilityName, data.abilities[abilityName]));
        }
    }

    if (Array.isArray(data.equipment)) {
        for (const item of data.equipment) {
            hydrate.equipment.push(HydrateItem(item));
        }
    } else {
        for (const itemName in data.equipment) {
            hydrate.equipment.push(HydrateItem(itemName, data.equipment[itemName]));
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

    return new Proxy<Mercenary>(hydrate, {
        get(target, prop, receiver) {
            if (prop === "costToMax") {
                let sumcost = 0;
                target.abilities.forEach(a => sumcost += a.costToMax);
                target.equipment.forEach(e => sumcost += e.costToMax);
                return sumcost;
            }

            const value = Reflect.get(target, prop, receiver);
            return typeof value === "function" ? value.bind(target) : value;
        }
    });;
}

function HydrateAbility(ability: string | MercAbility, abilityDto?: MercAbilityDto): MercAbility {
    const data = typeof ability === 'string' ? abilityDto : ability;

    const hydrate: MercAbility = {
        abilityName: typeof ability === 'string' ? ability : ability.abilityName,
        unlock: data.unlock,
        spell_school: data.spell_school as SpellSchool,
        speed: data.speed,
        description: data.description,
        tiers: [...data.tiers],
        cooldown: data.cooldown,
        activeTier: typeof ability === 'string' ? 1 : ability.activeTier,
        costToMax: -1,
        unlocked: false
    };

    return new Proxy<MercAbility>(hydrate, {
        get(target, prop, receiver) {
            if (prop === "costToMax") {
                return AbilityUpgradeCosts.slice(target.activeTier).reduce((c, p) => (c += p), 0);
            }

            const value = Reflect.get(target, prop, receiver);
            return typeof value === 'function' ? value.bind(target) : value;
        }
    })
}
function HydrateItem(item: string | MercItem, itemDto?: MercItemDto): MercItem {
    const data = typeof item === 'string' ? itemDto : item;

    const tiers = typeof item === 'string' ?
        [...(itemDto.tiers ?? [itemDto.modifier ? { modifier: itemDto.modifier } : {}])]
        : item.tiers;

    const hydrate: MercItem = {
        itemName: typeof item === 'string' ? item : item.itemName,
        unlock: data.unlock,
        position: data.position as "left" | "middle" | "right",
        affects: data.affects,
        description: data.description,
        tiers: tiers,
        activeTier: typeof item === 'string' ? MaxItemTiers - tiers.length + 1 : item.activeTier,
        costToMax: -1,
        unlocked: false
    };

    return new Proxy<MercItem>(hydrate, {
        get(target, prop, receiver) {
            if (prop === "costToMax") {
                return ItemUpgradeCosts.slice(target.activeTier).reduce((p, c) => (c += p), 0);
            }

            const value = Reflect.get(target, prop, receiver);
            return typeof value === 'function' ? value.bind(target) : value;
        }
    })
}



export function ExtractCollectedMerc(merc: Mercenary): CollectedMerc {
    return {
        collected: merc.collected,
        level: merc.level,
        tasksCompleted: merc.tasksCompleted,
        itemEquipped: merc.itemEquipped,
        abilities: merc.abilities.reduce((p, c) => { p[c.abilityName] = c.activeTier; return p; }, {}),
        equipment: merc.equipment.reduce((p, c) => { p[c.itemName] = c.activeTier; return p; }, {})
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
        merc.equipment.forEach(i => i.activeTier = data.equipment[i.itemName]);
    }
}