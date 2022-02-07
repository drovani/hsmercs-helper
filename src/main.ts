import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowCircleDown, faArrowCircleUp, faArrowDown19, faArrowDown91, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faBorderAll, faCheck, faCheckCircle, faCheckDouble, faFileExport, faFileImport, faMinusCircle, faPlus, faPlusCircle, faUndo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { store } from './store';


library.add(faArrowCircleUp, faArrowCircleDown, faCheck, faCheckDouble, faPlus,
    faCheckCircle, faUndo,
    faArrowUpAZ, faArrowDownAZ, faArrowDownZA, faPlusCircle, faMinusCircle, faBorderAll,
    faFileExport, faFileImport, faArrowDown19, faArrowDown91);

createApp(App)
    .component('icon', FontAwesomeIcon)
    .use(store)
    .mount('#app')
