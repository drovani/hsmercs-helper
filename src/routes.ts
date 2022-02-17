import Mercenaries from "./components/Mercenaries.vue";
import NotFoundComponent from "./components/NotFoundComponent.vue";

export const routes = [
    { path: '/', component: Mercenaries },
    { path: '/merc/:mercname', component: Mercenaries },
    { path: '/:pathMatch(.*)', component: NotFoundComponent }
]