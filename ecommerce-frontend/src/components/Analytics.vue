<template>
  <div class="mb-8"> 
    <!-- Sélecteur de période -->
    <div class=" flex w-full justify-end items-center pb-3 gap-4 ">
        <label for="timePeriod" class="block text-sm font-medium items-center text-gray-700 ">Sélectionnez une période :</label>
        <select
          id="timePeriod"
          v-model="selectedPeriod"
          @change="updateStats"
          class=" w-[200px] p-2 border border-gray-200 rounded"
        >
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="365">12 derniers mois</option>
        </select>
      </div>
      
    <!-- Contenu principal -->
    <div class="flex flex-row gap-4">  
      <div class="flex flex-col gap-4 w-full">
        <!-- Ventes Totales -->
        <div>
          <h3 class="text-xl font-semibold mb-2 bg-white border border-gray-300 p-8">
            Ventes Totales : <span class="text-green-700">{{ totalSales }} MAD</span>
          </h3>
        </div>

        <!-- Produits les plus vendus -->
        <div class="flex flex-col justify-center gap-4 bg-white p-4 border border-gray-300">
          <h3 class="text-lg font-semibold">Produits les Plus Vendus :</h3>
          <ul class="grid grid-cols-2 gap-6 pb-5">
            <li
              v-for="product in trendingProducts"
              :key="product.productName"
              class="flex flex-col w-full justify-center items-center text-white bg-cyan-500 text-lg rounded p-4"
            >
              {{ product.productName }}  
              <span class="font-medium">{{ product.quantitySold }} vendus</span> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Répartition des Ventes par Catégorie -->
      <div class="flex flex-col gap-1 bg-white px-4 border border-gray-300">
        <h3 class="text-lg font-semibold mt-6 mb-2">Répartition des Ventes par Catégorie :</h3>
        <div class="w-auto items-center justify-center pl-5 pb-3">
          <div v-if="loading" class="text-center">Chargement des données...</div>
          <div v-else class="w-[450px]">
            <pie-chart :data="categoryChartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { onMounted, ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { getCategorySales, getTotalSales, getTrendingProducts } from '../services/apiService';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    PieChart: Pie,
  },
  setup() {
    // États réactifs
    const totalSales = ref(0);
    const trendingProducts = ref([]);
    const categoryChartData = ref({ labels: [], datasets: [] });
    const selectedPeriod = ref("30"); // Période par défaut : 30 jours
    const loading = ref(true); // État de chargement

    // Fonction pour récupérer les données
    const updateStats = async () => {
      loading.value = true; // Activer le chargement
      try {
        // Appels API avec la période sélectionnée
        totalSales.value = await getTotalSales(selectedPeriod.value);
        trendingProducts.value = await getTrendingProducts(selectedPeriod.value);
        const categoryData = await getCategorySales(selectedPeriod.value);

        // Mettre à jour les données du graphique
        categoryChartData.value = {
          labels: categoryData.map((item) => item.category),
          datasets: [
            {
              data: categoryData.map((item) => item.totalSales),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
            },
          ],
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        loading.value = false; // Désactiver le chargement
      }
    };

    // Charger les données au montage
    onMounted(updateStats);

    return {
      totalSales,
      trendingProducts,
      categoryChartData,
      selectedPeriod,
      loading,
      updateStats,
    };
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
