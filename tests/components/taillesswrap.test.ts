import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TaillessWrap from "../../src/components/atomic/TaillessWrap.vue";

describe.skip('TaillessWrap.Vue component', () => {

    it('Keeps one word, everything else is null', () => {
        const wrapvue = shallowMount(TaillessWrap, {
            props: {
                text: "Only"
            }
        });
        expect(wrapvue.vm.keepTogether).to.equal("Only");
        expect(wrapvue.vm.everythingElse).to.be.null;
    })
    it('Keeps two words together, everything else is null', () => {
        const wrapvue = shallowMount(TaillessWrap, {
            props: {
                text: "Left Right"
            }
        });
        expect(wrapvue.vm.keepTogether).to.equal("Left Right");
        expect(wrapvue.vm.everythingElse).to.be.null;
    })
    it('Keeps last two words together, the rest is everything else', () => {
        const wrapvue = shallowMount(TaillessWrap, {
            props: {
                text: "Left Middle Right"
            }
        });
        expect(wrapvue.vm.keepTogether).to.equal("Middle Right");
        expect(wrapvue.vm.everythingElse).to.equal("Left ");
    })
})