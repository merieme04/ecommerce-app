<template>
  <div class="flex flex-row">
    <Sidebar />

    <main class="ml-96 flex-1 p-6">

      <Analytics
        :totalSales="totalSales"
        :trendingProducts="trendingProducts"
        :categorySales="categorySales"
      />

      <section>
        <h3 class="text-lg font-semibold mb-4">Liste des Produits</h3>
        <ProductList />
      </section>
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Analytics from "../components/Analytics.vue";
import ProductList from "../components/ProductList.vue";
import Sidebar from "../components/Sidebar.vue";
import { getCategorySales, getTotalSales, getTrendingProducts } from "../services/apiService";

export default {
  components: {
    Sidebar,
    ProductList,
    Analytics,
  },
  name: "Dashboard",
  setup() {
    const totalSales = ref(0);
    const trendingProducts = ref([]);
    const categorySales = ref([]);
    const selectedPeriod = ref("30");

    const updateStats = async () => {
      totalSales.value = await getTotalSales(selectedPeriod.value);
      trendingProducts.value = await getTrendingProducts(selectedPeriod.value);
      categorySales.value = await getCategorySales(selectedPeriod.value);
    };

    onMounted(updateStats);

    return { totalSales, trendingProducts, categorySales, selectedPeriod, updateStats };
  },
};
</script>
