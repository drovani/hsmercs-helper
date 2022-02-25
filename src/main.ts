import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleDown, faArrowCircleUp, faArrowDown19, faArrowDown91, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faBorderAll, faCheck, faCheckCircle, faCheckDouble, faFileExport, faFileImport, faMinusCircle, faPlus, faPlusCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';
import { routes } from "./routes";


library.add(faArrowCircleUp, faArrowCircleDown, faCheck, faCheckDouble, faPlus,
    faCheckCircle, faUndo,
    faArrowUpAZ, faArrowDownAZ, faArrowDownZA, faPlusCircle, faMinusCircle, faBorderAll,
    faFileExport, faFileImport, faArrowDown19, faArrowDown91);

const router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia();
//pinia.use(HSMercsPlugin);

createApp(App)
    .component('icon', FontAwesomeIcon)
    .use(pinia)
    .use(router)
    .mount('#app')
