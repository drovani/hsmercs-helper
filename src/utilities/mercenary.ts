import { AbilityUpgradeCosts, ItemUpgradeCosts, Rarity, Role, SpellSchool, Tribe } from "../models/constants";
import { CollectedMerc } from "../models/mercCollection";
import { MaxItemTiers, MercAbility, Mercenary, MercItem } from "../models/mercenary";
import { MercAbilityDto, MercenaryDto, MercItemDto } from "../models/mercLibrary";

export function HydrateMercenary(mercName: string, merc: MercenaryDto): Mercenary {
    const hydrate: Mercenary = {
        mercName: mercName,
        role: merc.role as Role,
        rarity: merc.rarity as Rarity,
        tribe: merc.tribe as Tribe,
        attack: merc.attack,
        health: merc.health,
        abilities: [],
        equipment: [],
        tasks: [],
        collected: false,
        costToMax: -1,
        level: 1,
        tasksCompleted: 0
    };
    for (const abilityName in merc.abilities) {
        hydrate.abilities.push(HydrateAbility(abilityName, merc.abilities[abilityName]));
    }
    for (const itemName in merc.equipment) {
        hydrate.equipment.push(HydrateItem(itemName, merc.equipment[itemName]));
    }
    for (const task of merc.tasks) {
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
    });
}

function HydrateAbility(abilityName: string, ability: MercAbilityDto): MercAbility {
    const hydrate: MercAbility = {
        abilityName: abilityName,
        unlock: ability.unlock,
        spell_school: ability.spell_school as SpellSchool,
        speed: ability.speed,
        description: ability.description,
        tiers: [...ability.tiers],
        cooldown: ability.cooldown,
        activeTier: 1,
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
function HydrateItem(itemName: string, item: MercItemDto): MercItem {
    const hydrate: MercItem = {
        itemName: itemName,
        unlock: item.unlock,
        position: item.position as "left" | "middle" | "right",
        affects: item.affects,
        description: item.description,
        tiers: [...(item.tiers ?? [item.modifier ? { modifier: item.modifier } : {}])],
        activeTier: -1,
        costToMax: -1,
        unlocked: false
    };
    hydrate.activeTier = MaxItemTiers - hydrate.tiers.length + 1;

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



export function ExtractCollectMerc(merc: Mercenary): CollectedMerc {
    return {
        collected: merc.collected,
        level: merc.level,
        tasksCompleted: merc.tasksCompleted,
        itemEquipped: merc.itemEquipped,
        abilities: merc.abilities.reduce((p, c) => p[c.abilityName] = merc.abilities.find(a => a.abilityName === c.abilityName).activeTier, {}),
        equipment: merc.equipment.reduce((p, c) => p[c.itemName] = merc.equipment.find(i => i.itemName === c.itemName).activeTier, {})
    }
}

export function ApplyCollectedMerc(merc: Mercenary, data: CollectedMerc) {
    merc.collected = data.collected;
    merc.level = data.level;
    merc.tasksCompleted = data.tasksCompleted;
    merc.itemEquipped = data.itemEquipped;
    merc.abilities.forEach(a => a.activeTier = data.abilities[a.abilityName]);
    merc.equipment.forEach(i => i.activeTier = data.equipment[i.itemName]);
}