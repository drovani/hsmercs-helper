import { RouteRecordRaw } from "vue-router";
import Bounties from "./components/Bounties.vue";
import Mercenaries from "./components/Mercenaries.vue";

export const routes: RouteRecordRaw[] = [
    { path: '/mercs/:selectedMercName?', component: Mercenaries, props: true, name: 'mercs' },
    { path: '/bounties/:selectedBountyName?', component: Bounties, props: true, name: 'bounties'},
    { path: '/', component: Mercenaries }
]