import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleDown, faArrowCircleUp, faArrowDown19, faArrowDown91, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faAward, faBorderAll, faCheck, faCheckCircle, faCheckDouble, faFileExport, faFileImport, faFilter, faLock, faMinusCircle, faPlus, faPlusCircle, faThumbTack, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';
import { routes } from "./routes";
import { HSMercsPlugin } from "./stores/mercenaries";


library.add(faArrowCircleUp, faArrowCircleDown, faCheck, faCheckDouble, faPlus,
    faCheckCircle, faUndo, faCheck, faAward, faFilter,
    faArrowUpAZ, faArrowDownAZ, faArrowDownZA, faPlusCircle, faMinusCircle, faBorderAll,
    faFileExport, faFileImport, faArrowDown19, faArrowDown91, faLock, faThumbTack);

const router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia();
pinia.use(HSMercsPlugin);

createApp(App)
    .component('fa-icon', FontAwesomeIcon)
    .component('fa-icon-layers', FontAwesomeLayers)
    .use(pinia)
    .use(router)
    .mount('#app')
