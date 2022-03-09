
export default function descriptionBuilder(base: string, tier: any, modifier?: any): string {
    let desc = `${base}`;

    const tierdesc = normalizeDescriptionModifier(tier);
    const moddesc = normalizeDescriptionModifier(modifier);

    if (moddesc.replacement) {
        desc = `${moddesc.replacement}`;
    } else if (tierdesc.replacement) {
        desc = `${tierdesc.replacement}`;
    }

    if (moddesc.append) {
        const space = moddesc.append[0] === "," ? "" : " ";
        desc = `${desc}${space}${moddesc.append}`;
    }
    if (moddesc.prepend) {
        desc = `${moddesc.prepend} ${desc}`;
    }

    // console.debug({ base, tier, modifier });
    // console.debug({ desc, tierdesc, moddesc });

    const regex = new RegExp(/\{([\w \(\)\.]+)\}/, "g");
    const matches = Array.from(desc.matchAll(regex));

    for (let i = 0; i < matches.length; i++) {
        if (!Number.isNaN(Number(matches[i][1]))) {
            // Found {0}
            const descValue = Number(matches[i][1]);
            const tierValue = Number(tierdesc.substitute[i]) || 0;
            const modValue = Number(moddesc.substitute[i]) || 0;

            desc = desc.replace(matches[i][0], String(descValue + tierValue + modValue));
        } else {
            // Found {string}
            if (typeof moddesc.substitute[i] !== "undefined" && moddesc.substitute[i] !== null) {
                // replace {string} with modifier value
                desc = desc.replace(matches[i][0], `${moddesc.substitute[i]}`);
            } else if (typeof tierdesc.substitute[i] !== "undefined" && tierdesc.substitute[i] !== null) {
                // replace {string} with tier value
                desc = desc.replace(matches[i][0], `${tierdesc.substitute[i]}`);
            } else {
                // replace {string} with string (i.e. remove braces)
                desc = desc.replace(matches[i][0], matches[i][1]);
            }
        }
    }

    return desc.replaceAll(/[\{\}]/g, "");
}

function normalizeDescriptionModifier(description: any): Description {
    const desc: Description = {
        substitute: []
    };

    if (description === null || typeof description === "undefined") {
        return desc;
    }

    if (typeof description === "string" || typeof description === "number") {
        // description = "string" || description = 0
        desc.substitute = [description];
    } else if (Array.isArray(description)) {
        // description = ["string", null, 0]
        desc.substitute = description;
    } else if (typeof description.substitute === "string" || typeof description.substitute === "number") {
        // description.substitute = "string" || description.substitute = 0
        desc.substitute = [description.substitute];
    } else if (typeof description.substitute !== "undefined") {
        // description.substitute = ["string", null, 0]
        desc.substitute = description.substitute;
    }

    desc.append = description.append;
    desc.replacement = description.replacement;
    desc.prepend = description.prepend;

    return desc;
}

interface Description {
    append?: string,
    replacement?: string,
    prepend?: string,
    substitute: (string | number | null)[]
}