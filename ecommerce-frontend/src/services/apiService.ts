import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getTotalSales = async (period: string) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/total_sales`, {
    params: { period },
  });
  return response.data.totalSales;
};

export const getTrendingProducts = async (period: string) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/trending_products`, {
    params: { period },
  });
  return response.data;
};

export const getCategorySales = async (period: string) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/category_sales`, {
    params: { period },
  });
  return response.data;
};

export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};
