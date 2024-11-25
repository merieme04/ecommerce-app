<template>
  <div class="">
    <table class="w-full border-collapse rounded-xl border border-cyan-700 text-left">
  <thead >
    <tr class="bg-cyan-600">
      <th class="border text-white font-semibold border-cyan-700 px-4 py-2">Nom du produit</th>
      <th class="border text-white font-semibold border-cyan-700 px-4 py-2">Category</th>
      <th class="border text-white font-semibold border-cyan-700 px-4 py-2">Prix</th>
      <th class="border text-white font-semibold border-cyan-700 px-4 py-2">Ventes Totales</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="product in products"
      :key="product.productId"
      class="odd:bg-white even:bg-gray-100 hover:bg-gray-50"
    >
      <td class="border border-cyan-700 px-4 py-2">{{ product.productName }}</td>
      <td class="border border-cyan-700 px-4 py-2">{{ product.category }}</td>
      <td class="border border-cyan-700 px-4 py-2">{{ product.price }} €</td>
      <td class="border border-cyan-700 px-4 py-2">{{ product.totalSales }}</td>
    </tr>
  </tbody>
</table>


    <!-- Pagination -->
    <div class="flex justify-end items-center gap-2 mt-4">
      
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-cyan-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <
      </button>
      
      <span class="text-cyan-600">
         {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-cyan-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        >
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getProducts } from "../services/apiService";

export default {
  name: "ProductList",
  setup() {
    const products = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);

    const loadProducts = async (page = 1) => {
      try {
        const response = await getProducts(page);
        products.value = response.products;
        currentPage.value = response.currentPage;
        totalPages.value = response.totalPages;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        loadProducts(currentPage.value + 1);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        loadProducts(currentPage.value - 1);
      }
    };

    onMounted(() => loadProducts(currentPage.value));

    return {
      products,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  },
};
</script>
