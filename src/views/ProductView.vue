<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-blue-600">Product List</h1>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
        @click="newProduct"
      >
        Add Product
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="flex mb-4 space-x-4">
      <input
        v-model="searchQuery"
        @input="fetchProducts"
        placeholder="Search products..."
        class="border border-gray-300 text-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <select
        v-model="selectedCategory"
        @change="fetchProducts"
        class="border border-gray-300 text-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Product List -->
    <div class="bg-white rounded-lg shadow">
      <ul>
        <li
          v-for="product in products.data"
          :key="product.id"
          class="flex justify-between items-center border-b p-4 text-gray-700 hover:bg-gray-100"
        >
          <div>
            <h3 class="font-semibold">{{ product.name }}</h3>
            <p class="text-sm text-gray-500">{{ product.description }}</p>
          </div>
          <div>
            <button
              @click="editProduct(product.id)"
              class="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(product.id)"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Pagination Info and Buttons -->
    <div class="mt-8 flex justify-between items-center">
      <!-- Page Info -->
      <span class="text-gray-600">
        Page {{ currentPage }} of {{ totalPages }} ({{ totalItems }} items)
      </span>

      <!-- Pagination Buttons -->
      <div>
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 mr-2 transition duration-200"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  name: 'ProductIndex',
  setup() {
    const products = ref({ data: [], prev_page_url: null, next_page_url: null });
    const categories = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const currentPage = ref(1);
    const totalPages = ref(0);
    const totalItems = ref(0);

    const router = useRouter();

    const fetchProducts = async (page = 1) => {
      try {
        const response = await axios.get('/products', {
          params: {
            search: searchQuery.value,
            category: selectedCategory.value,
            page: page,
          },
        });
        currentPage.value = response.data.meta.current_page;
        totalPages.value = response.data.meta.last_page;
        totalItems.value = response.data.meta.total;
        products.value = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/products/categories'); 
        categories.value = response.data;
        console.l
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const deleteProduct = async (productId) => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await axios.delete(`/products/${productId}`);
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    };

    const editProduct = (productId) => {
      router.push(`/products/${productId}/edit`);
    };

    const prevPage = () => {

      if (products.value.links.prev) {
        currentPage.value--;
        fetchProducts(currentPage.value);
      }
    };

  const nextPage = () => {

    if (products.value.links.next) {
      currentPage.value++; 
      fetchProducts(currentPage.value);
    }
  };

    const newProduct = () => {
      router.push('/products/create');
    };

    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      fetchProducts,
      deleteProduct,
      newProduct,
      prevPage,
      nextPage,
      totalPages,
      totalItems,
      currentPage,
      editProduct
    };
  },
};
</script>

<style scoped>
/* Add basic styling if needed */
</style>