import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleDown, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { store } from './store';


library.add(faArrowCircleUp, faArrowCircleDown);

createApp(App)
    .component('icon', FontAwesomeIcon)
    .use(store)
    .mount('#app')
