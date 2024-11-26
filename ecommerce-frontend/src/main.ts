import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';

// Créer l'instance de l'application Vue
createApp(App)
  .use(router)  // Utiliser le router pour la navigation
  .mount('#app');  // Monter l'application sur l'élément #app dans index.html
