import Mercenaries from "./components/Mercenaries.vue";

export const routes = [
    { path: '/merc', component: Mercenaries },
    { path: '/merc/:mercname', component: Mercenaries },
]