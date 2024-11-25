import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import store from './store';

// Créer l'instance de l'application Vue
createApp(App)
  .use(router)  // Utiliser le router pour la navigation
  .use(store)   // Utiliser Vuex pour la gestion de l'état global
  .mount('#app');  // Monter l'application sur l'élément #app dans index.html
