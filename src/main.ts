import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowCircleDown, faArrowCircleUp, faCheck, faCheckCircle, faCheckDouble, faPlus, faUndo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { store } from './store';


library.add(faArrowCircleUp, faArrowCircleDown, faCheck, faCheckDouble, faPlus,
    faCheckCircle, faUndo);

createApp(App)
    .component('icon', FontAwesomeIcon)
    .use(store)
    .mount('#app')
