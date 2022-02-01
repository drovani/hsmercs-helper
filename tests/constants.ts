import Mercenary from "../src/models/mercenary";

export const KingMukla: Mercenary = {
    role: "Protector",
    rarity: "Epic",
    tribe: "Beast",
    attack: 10,
    health: 73,
    abilities: {
        "Banana Frenzy": {
            "unlock": 1,
            "speed": 7,
            "description": "Given {0} Banana{s} randomly to your characters and Attack an enemy.",
            "tiers": [
                {
                    "description": [
                        1,
                        ""
                    ]
                },
                {
                    "description": 2
                },
                {
                    "description": 3
                },
                {
                    "description": 4
                },
                {
                    "description": 5
                }
            ]
        },
        "Dinner Time": {
            "unlock": 5,
            "speed": 4,
            "cooldown": 1,
            "description": "Eat {0} Banana{s} and gain Taunt this turn.",
            "spell_school": "Nature",
            "tiers": [
                {
                    "description": [
                        1,
                        ""
                    ]
                },
                {
                    "description": 2
                },
                {
                    "description": 3
                },
                {
                    "description": 3,
                    "speed": -1
                },
                {
                    "description": 3,
                    "speed": -2
                }
            ]
        },
        "Primal Power": {
            "unlock": 15,
            "speed": 3,
            "cooldown": 1,
            "spell_school": "Nature",
            "description": "Give a friendly Beast +{0} Attack and Immune while Attacking this turn.",
            "tiers": [
                {
                    "description": 5
                },
                {
                    "description": 8
                },
                {
                    "description": 11
                },
                {
                    "description": 13
                },
                {
                    "description": 15
                }
            ]
        }
    },
    equipment: {
        "Refreshing Bananas": {
            "unlock": "Level 30",
            "position": "left",
            "description": "Bananas give an additional +{0} Health",
            "tiers": [
                {
                    "description": 1
                },
                {
                    "description": 2
                },
                {
                    "description": 3
                },
                {
                    "description": 4
                }
            ]
        },
        "Radioactive Bananas": {
            "unlock": "Task 2",
            "position": "middle",
            "description": "Bananas give an additional +{0} Attack.",
            "tiers": [
                {
                    "description": 1
                },
                {
                    "description": 2
                }
            ]
        },
        "Mukla's Big Brother": {
            "unlock": "Task 7",
            "position": "right",
            "description": "Battlecry: Summon a {0}/{0} Beast with Taunt.",
            "tiers": [
                {
                    "description": [
                        2,
                        5
                    ]
                },
                {
                    "description": [
                        5,
                        10
                    ]
                },
                {
                    "description": [
                        8,
                        15
                    ]
                },
                {
                    "description": [
                        12,
                        24
                    ]
                }
            ]
        }
    },
    tasks: [{
        "name": "Eat your Bananas",
        "description": "Deal 55 damage using Banana Frenzy.",
        "quote": "<Bananas makes you stronger!>"
    },
    {
        "name": "Beast Force",
        "description": "Deal 90 damage with Beasts with a team that includes this Mercenary.",
        "quote": "<Bananas are filled with lots of vitamins!>"
    },
    {
        "name": "Drive them Away",
        "description": "Use Primal Power 12 times.",
        "quote": ""
    },
    {
        "name": "King of the Jungle",
        "description": "Deal 150 damage.",
        "quote": ""
    },
    {
        "name": "Sweet Solitude",
        "description": "Complete a bounty while at level 30.",
        "quote": ""
    },
    {
        "name": "Fight them Off",
        "description": "Destroy 40 minions.",
        "quote": ""
    },
    {
        "name": "Who is Stronger?",
        "description": "Defeat 2 Heroic bosses.",
        "quote": "<These ones seem strong, but I am stronger.>"
    },
    {
        "name": "Who needs Protecting?",
        "description": "Use the Boon: Protector coin 2 times.",
        "quote": ""
    },
    {
        "name": "Rejuvenating Bananas",
        "description": "Gain 60 Health using Banana Frenzy.",
        "quote": "<Bananas are filled with lots of vitamins!>"
    },
    {
        "name": "Banana Frenzy",
        "description": "Deal 450 damage with Beasts with a team that includes this Mercenary.",
        "quote": "<Bananas makes you stronger!>"
    },
    {
        "name": "Mukla's Mayhem",
        "description": "Deal 450 damage.",
        "quote": "<Without my size I would not be king, but I must use this gift to help my fellow beasts.>"
    },
    {
        "name": "Protecting my Island",
        "description": "Deal 450 damage with Beasts with a team that includes this Mercenary.",
        "quote": ""
    },
    {
        "name": "Aid the Jungle",
        "description": "Complete 4 Heroic Bounties.",
        "quote": ""
    },
    {
        "name": "King of the Cape",
        "description": "Gain 15 Attack using Banana Frenzy.",
        "quote": ""
    },
    {
        "name": "Scare them Away",
        "description": "Complete 6 Bounties.",
        "quote": ""
    },
    {
        "name": "Swords Still Hurt",
        "description": "Deal 900 damage to Fighters.",
        "quote": ""
    },
    {
        "name": "Family Ties",
        "description": "Destroy 75 enemies using Mukla's Big Brother.",
        "quote": "<These ones seem strong, but I am stronger.>"
    },
    {
        "name": "Simian Slam",
        "description": "Deal 450 damage to Heroic bosses.",
        "quote": ""
    }]
};
export const BlademasterSamuro: Mercenary = {
    role: "Fighter",
    rarity: "Rare",
    tribe: "Orc",
    attack: 10,
    health: 66,
    abilities: {
        "Double Strike": {
            "unlock": 1,
            "description": "Attack an enemy. If it was damaged this turn, gain +{0} Attack and Attack it again.",
            "speed": 4,
            "tiers": [
                {
                    "description": 1
                },
                {
                    "description": 2
                },
                {
                    "description": 3
                },
                {
                    "description": 4
                },
                {
                    "description": 5
                }
            ]
        },
        "Mirror Image": {
            "unlock": 5,
            "description": "Choose an enemy. Summon {a copy} of this Merc that Attack{s} it and die{s} as the end of the turn.",
            "speed": 9,
            "cooldown": 1,
            "tiers": [
                {
                    "speed": 0
                },
                {
                    "speed": -2
                },
                {
                    "speed": -4
                },
                {
                    "speed": -5
                },
                {
                    "speed": -6
                }
            ]
        },
        "Whirling Blade": {
            "unlock": 15,
            "description": "Deal {0} damage to all enemies. Gain Immune this turn.",
            "speed": 5,
            "cooldown": 1,
            "tiers": [
                {
                    "description": 2
                },
                {
                    "description": 5
                },
                {
                    "description": 8
                },
                {
                    "description": 9
                },
                {
                    "description": 10
                }
            ]
        }
    },
    equipment: {
        "Honed Blade": {
            "unlock": "Level 30",
            "position": "middle",
            "affects": "Whirling Blade",
            "description": "Whirling Blade does {0} more damage.",
            "tiers": [
                {
                    "description": 1,
                    "modifier": {
                        "description": 1
                    }
                },
                {
                    "description": 2,
                    "modifier": {
                        "description": 2
                    }
                },
                {
                    "description": 3,
                    "modifier": {
                        "description": 3
                    }
                },
                {
                    "description": 4,
                    "modifier": {
                        "description": 4
                    }
                }
            ]
        },
        "Burning Blade": {
            "unlock": "Task 2",
            "position": "right",
            "description": "Passive: Whenever this Merc Attacks, gain {stats}.",
            "tiers": [
                {
                    "description": "+1 Attack"
                },
                {
                    "description": "+2 Attack"
                },
                {
                    "description": "+2/+1"
                },
                {
                    "description": "+2/+2"
                }
            ]
        },
        "Sash of Illusion": {
            "unlock": "Task 7",
            "position": "left",
            "affects": "Mirror Image",
            "description": "Mirror Image summons an extra copy of this Merc.",
            "modifier": {
                "description": "2 copies"
            }
        }
    },
    tasks: [
        {
            "name": "For My Clan",
            "description": "Deal 40 damage using Double Strike.",
            "quote": "My blade seeks vengeance for the fall of the Burning Blade, my clan…"
        },
        {
            "name": "Whirling Blade",
            "description": "Deal 70 damage using Mirror Image.",
            "quote": "I will see that these fools atone for their deeds."
        },
        {
            "name": "Doppelganger",
            "description": "Use Whirling Blade 10 times.",
            "quote": "I cannot tell you all that has passed, only that these ones must perish."
        },
        {
            "name": "The Burning Blade",
            "description": "Deal 150 damage.",
            "quote": "If I do this, I will be one step closer to peace."
        },
        {
            "name": "Focus and Discipline",
            "description": "Complete a bounty while at level 30.",
            "quote": "I must face these foes and teach them the meaning of vengeance."
        },
        {
            "name": "Death before Disgrace",
            "description": "Destroy 40 minions.",
            "quote": "This one will be more difficult."
        },
        {
            "name": "Glory for the Horde",
            "description": "Defeat 2 Heroic bosses.",
            "quote": "Even a Blademaster would break a sweat doing this one."
        },
        {
            "name": "The Fire Within",
            "description": "Use the Boon: Fighter coin 2 times.",
            "quote": "The impudence of my enemies never ceases."
        },
        {
            "name": "Mark of the Warrior",
            "description": "Gain 75 Attack using Double Strike.",
            "quote": "The Burning Blade would make short work of them, but instead it falls to me."
        },
        {
            "name": "I Serve the Warchief",
            "description": "Deal 270 damage using Double Strike.",
            "quote": "I will fight well and taste glory!"
        },
        {
            "name": "Vengeance for my Clan",
            "description": "Deal 450 damage.",
            "quote": "I will see that these fools atone for their deeds."
        },
        {
            "name": "Sacrifice for my Clan",
            "description": "Deal 450 damage with Orcs with a team that includes this Mercenary.",
            "quote": "If I do this, I will be one step closer to peace."
        },
        {
            "name": "They Die Well",
            "description": "Complete 4 Heroic Bounties.",
            "quote": "I cannot tell you all that has passed, only that these ones must perish."
        },
        {
            "name": "Disciple of the Blade",
            "description": "Deal 490 damage using Mirror Image.",
            "quote": "This one will be more difficult."
        },
        {
            "name": "The Honor of the Blade",
            "description": "Complete 6 Bounties.",
            "quote": "I must face these foes and teach them the meaning of vengeance."
        },
        {
            "name": "The Road to Redemption",
            "description": "Deal 900 damage to Casters.",
            "quote": "Even a Blademaster would break a sweat doing this one."
        },
        {
            "name": "We Fight as One",
            "description": "Destroy 40 enemies using Whirling Blade.",
            "quote": "The impudence of my enemies never ceases."
        },
        {
            "name": "Spirits bring me Honor",
            "description": "Deal 450 damage to Heroic bosses.",
            "quote": "The Burning Blade would make short work of them, but instead it falls to me."
        }
    ]
};
export const JainaProudmoore: Mercenary = {
    role: "Caster",
    rarity: "Legendary",
    tribe: "Human",
    attack: 7,
    health: 72,
    abilities: {
        "Icicle": {
            "unlock": 1,
            "speed": 7,
            "spell_school": "Frost",
            "description": "Deal {0} damage to a character. If it's Frozen, deal {0} damage instead.",
            "tiers": [
                {
                    "description": [
                        4,
                        8
                    ]
                },
                {
                    "description": [
                        8,
                        12
                    ]
                },
                {
                    "description": [
                        12,
                        16
                    ]
                },
                {
                    "description": [
                        13,
                        22
                    ]
                },
                {
                    "description": [
                        14,
                        24
                    ]
                }
            ]
        },
        "Ice Floes": {
            "unlock": 5,
            "speed": 6,
            "spell_school": "Frost",
            "description": "Deal {0} damage. Gain +{0} Frost Damage.",
            "tiers": [
                {
                    "description": [
                        4,
                        1
                    ]
                },
                {
                    "description": [
                        7,
                        2
                    ]
                },
                {
                    "description": [
                        10,
                        3
                    ]
                },
                {
                    "description": [
                        11,
                        3
                    ]
                },
                {
                    "description": [
                        12,
                        3
                    ]
                }
            ]
        },
        "Water Elemental": {
            "unlock": 15,
            "speed": 5,
            "cooldown": 1,
            "summon": {
                "name": "Water Elemental",
                "description": "Taunt. Whenever this damages a character, Freeze them.",
                "tribe": "Elemental"
            },
            "tiers": [
                {
                    "summon": {
                        "attack": 3,
                        "health": 6
                    }
                },
                {
                    "summon": {
                        "attack": 6,
                        "health": 10
                    }
                },
                {
                    "summon": {
                        "attack": 10,
                        "health": 14
                    }
                },
                {
                    "summon": {
                        "attack": 11,
                        "health": 15
                    }
                },
                {
                    "summon": {
                        "attack": 12,
                        "health": 16
                    }
                }
            ]
        }
    },
    equipment: {
        "Frost Shards": {
            "unlock": "Level 30",
            "position": "left",
            "affects": "Icicle",
            "description": "Icicle deals {0} more damage.",
            "tiers": [
                {
                    "description": 2,
                    "modifier": {
                        "description": [
                            2,
                            2
                        ]
                    }
                },
                {
                    "description": 3,
                    "modifier": {
                        "description": [
                            3,
                            3
                        ]
                    }
                },
                {
                    "description": 4,
                    "modifier": {
                        "description": [
                            4,
                            4
                        ]
                    }
                },
                {
                    "description": 5,
                    "modifier": {
                        "description": [
                            5,
                            5
                        ]
                    }
                }
            ]
        },
        "Frost Dust": {
            "unlock": "Task 2",
            "position": "middle",
            "affects": "Water Elemental",
            "description": "Water Elemental has an additional +{0}/+{0}.",
            "tiers": [
                {
                    "description": [
                        1,
                        2
                    ],
                    "modifier": {
                        "summon": {
                            "attack": 1,
                            "health": 2
                        }
                    }
                },
                {
                    "description": [
                        2,
                        4
                    ],
                    "modifier": {
                        "summon": {
                            "attack": 2,
                            "health": 4
                        }
                    }
                },
                {
                    "description": [
                        3,
                        6
                    ],
                    "modifier": {
                        "summon": {
                            "attack": 3,
                            "health": 6
                        }
                    }
                },
                {
                    "description": [
                        4,
                        8
                    ],
                    "modifier": {
                        "summon": {
                            "attack": 4,
                            "health": 8
                        }
                    }
                }
            ]
        },
        "Ice Block Talisman": {
            "unlock": "Task 7",
            "position": "right",
            "description": "Passive: The first time this Merc would take fatal damage, prevent it and become Immune this turn."
        }
    },
    tasks: [
        {
            "name": "Served Cold",
            "description": "Deal 80 damage using Icicle.",
            "quote": "My enemies are close. Will you help me defend against them?"
        },
        {
            "name": "Believe in Magic",
            "description": "Deal 85 damage using Ice Floes.",
            "quote": "The Horde and Alliance can coexist. And this place proves it."
        },
        {
            "name": "Tearing You Apart",
            "description": "Summon a Water Elemental 12 times.",
            "quote": "Time is of the essence."
        },
        {
            "name": "Press Forward!",
            "description": "Deal 150 damage.",
            "quote": "My magic is unrivaled. But having more never hurt anything."
        },
        {
            "name": "The Battle Awaits Us",
            "description": "Complete a bounty while at level 30.",
            "quote": "Time to turn the tide."
        },
        {
            "name": "Let's Try That Again",
            "description": "Destroy 40 minions.",
            "quote": "The currents of magic are in upheaval."
        },
        {
            "name": "Watch Out",
            "description": "Defeat 2 Heroic bosses.",
            "quote": "There's much to be done."
        },
        {
            "name": "A Chance Opportunity",
            "description": "Use the Boon: Caster coin 2 times.",
            "quote": "Let's tend to this quickly."
        },
        {
            "name": "A Little Help",
            "description": "Destroy 45 enemies using Water Elemental.",
            "quote": "Shhh... I'm trying to think here."
        },
        {
            "name": "That's a Magic Moment",
            "description": "Deal 270 damage using Ice Floes.",
            "quote": "The cold never bothered me. However, it might bother them…"
        },
        {
            "name": "This Should be Quick",
            "description": "Deal 450 damage.",
            "quote": "Time is of the essence."
        },
        {
            "name": "That Was Close",
            "description": "Deal 30 or more damage in one turn using Ice Floes 15 times.",
            "quote": "Shhh... I'm trying to think here."
        },
        {
            "name": "This Should be Good",
            "description": "Complete 4 Heroic Bounties.",
            "quote": "There's much to be done."
        },
        {
            "name": "Chill Out For a Bit",
            "description": "Deal 900 Frost Damage with a team that includes this Mercenary.",
            "quote": "The currents of magic are in upheaval."
        },
        {
            "name": "You're the Next to Fall",
            "description": "Complete 6 Bounties.",
            "quote": "Time to turn the tide."
        },
        {
            "name": "It's Nothing Personal",
            "description": "Deal 900 damage to Protectors.",
            "quote": "My magic is unrivaled. But having more never hurt anything."
        },
        {
            "name": "It's Going to be Icy",
            "description": "Deal 900 Frost Damage with a team that includes this Mercenary.",
            "quote": "Let's tend to this quickly."
        },
        {
            "name": "This Isn't Your Day",
            "description": "Deal 450 damage to Heroic bosses.",
            "quote": "The cold never bothered me. However, it might bother them…"
        }
    ]
};