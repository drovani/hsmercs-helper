import { describe, expect, test } from "vitest";
import descriptionBuilder from "../../src/common/description";

describe('Description helper function tests', () => {

    const cases = [
        ["Deal {0} damage to an enemy, or restore {0} Health to a friendly character.",
            [4, 10],
            [],
            "Deal 4 damage to an enemy, or restore 10 Health to a friendly character."
        ],
        ["Deal {0} damage to an enemy, or restore {0} Health to a friendly character.",
            [4, 10],
            [2, 2],
            "Deal 6 damage to an enemy, or restore 12 Health to a friendly character."
        ],
        [
            "Deal {0} damage to an enemy. If you control another Dragon, also damage its neighbors.",
            5,
            undefined,
            "Deal 5 damage to an enemy. If you control another Dragon, also damage its neighbors."
        ],
        [
            "Deal damage to an enemy equal to their Attack.",
            [],
            {
                append: "Restore that much Health to this Merc."
            },
            "Deal damage to an enemy equal to their Attack. Restore that much Health to this Merc."
        ],
        [
            "Cast Fireball {0} at {0} random enem{y}. Repeat for each Fire ability you've cast this turn.",
            [1, 1],
            undefined,
            "Cast Fireball 1 at 1 random enemy. Repeat for each Fire ability you've cast this turn."
        ],
        [
            "Cast Fireball {0} at {0} random enem{y}. Repeat for each Fire ability you've cast this turn.",
            [1, 1],
            [0, 1, "ies"],
            "Cast Fireball 1 at 2 random enemies. Repeat for each Fire ability you've cast this turn."
        ],
        [
            "Choose an enemy. Summon {a copy} of this Merc that Attack{s} it and die{s} at the end of the turn.",
            undefined,
            undefined,
            "Choose an enemy. Summon a copy of this Merc that Attacks it and dies at the end of the turn."
        ],
        [
            "Choose an enemy. Summon {a copy} of this Merc that Attack{s} it and die{s} at the end of the turn.",
            undefined,
            ["2 copies", "", ""],
            "Choose an enemy. Summon 2 copies of this Merc that Attack it and die at the end of the turn."
        ],
        [
            "Gain Taunt for {0} turn{s}. Your characters are ({0}) Speed faster this turn{.}",
            [1, "", 2],
            [0, null, 0, ", and this Merc's next ability is (2) Speed faster."],
            "Gain Taunt for 1 turn. Your characters are (2) Speed faster this turn, and this Merc's next ability is (2) Speed faster."
        ],
        [
            "Gain Taunt for {0} turn{s}. Your characters are ({0}) Speed faster this turn{.}",
            [2, null, 4],
            [0, null, 0, ", and this Merc's next ability is (3) Speed faster."],
            "Gain Taunt for 2 turns. Your characters are (4) Speed faster this turn, and this Merc's next ability is (3) Speed faster."
        ],
        [
            "Deal {0} damage. Restore that much health to this Merc.",
            4,
            {
                append: "Gain +{0} Fel Damage.",
                substitute: [
                    0,
                    1
                ]
            },
            "Deal 4 damage. Restore that much health to this Merc. Gain +1 Fel Damage."
        ],
        [
            "Gain Taunt and this takes {0} less damage this turn.",
            4,
            {
                replacement: "This Merc takes {0} less damage, gains Taunt, and cannot be Critically Damaged this turn.",
                substitute: 1
            },
            "This Merc takes 5 less damage, gains Taunt, and cannot be Critically Damaged this turn."
        ],
        [
            "This Merc takes Critical Damage this turn. At the end of next turn, restore {0} Health to this Merc.",
            {
                replacement: "This Merc takes Critical Damage this turn. At the end of next turn, restore this Merc to full Health."
            },
            {
                prepend: "Restore 16 Health to this Merc."
            },
            "Restore 16 Health to this Merc. This Merc takes Critical Damage this turn. At the end of next turn, restore this Merc to full Health."
        ],
        [
            "Attack an enemy then gain Stealth.",
            undefined,
                        {
                "prepend": "Gain +{0} Attack.",
                "substitute": 1
            },
            "Gain +1 Attack. Attack an enemy then gain Stealth."
        ]
    ]


    test.each(cases)('Description Builder:',
        (base: string, tier: any, modifier: any, expectedResult: string) => {
            const result = descriptionBuilder(base, tier, modifier);

            if (expectedResult != result) {
                console.debug({
                    expectedResult,
                    result
                })
            }

            expect(expectedResult).to.equal(result);
        })


})