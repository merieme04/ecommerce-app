<template>
  <aside class="fixed top-0 left-0 h-screen bg-cyan-800 text-white px-3 shadow-lg w-96 overflow-y-auto">
    <div class=" flex flex-col justify-center items-center gap-2 text-xl py-10"> 
      <img src="@/assets/avatar.png" alt="Avatar" class="w-36 rounded-full" />
       <div class="text-xl font-semibold">
        Anasri Merieme 
       </div>
       <div class="text-base">
         meriemeanasri@gmail.com
       </div> 
      </div>
    <div class="w-full border border-x-gray-400 "></div>

    <nav class="pt-4">
      <ul>
        <li
          v-for="link in links"
          :key="link.name"
          :class="[
            'w-full text-lg hover:bg-cyan-700  p-4 rounded-sm ',
            isActive(link.path) ? 'bg-cyan-600' : ''
          ]"
        >
          <a :href="link.path">{{ link.name }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const route = useRoute();

    const links = [
      { name: 'Tableau de Bord', path: '' },
      { name: 'Produits', path: '#products' },
      { name: 'Ventes', path: '#sales' },
      { name: 'Notifications', path: '#Notifications' },
      { name: 'Paramètres', path: '#settings' },
    ];

    const isActive = (path: string) => route.hash === path;

    return { links, isActive };
  },
});
</script>

<style scoped>
/* Les styles restent gérés par Tailwind CSS */
</style>
