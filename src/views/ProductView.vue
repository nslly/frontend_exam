<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold mb-4">Product List</h1>
      <button class="px-4 py-2 bg-blue-600 text-white" @click="newProduct">Add Product</button>

    </div>

    <!-- Search and Filter -->
    <div class="flex mb-4 space-x-4">
      <input v-model="searchQuery" @input="filterProducts" placeholder="Search products..." class="border p-2" />

      <select v-model="selectedCategory" @change="filterProducts" class="border p-2">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">

          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Product List -->
    <div>
      <ul>
        <li v-for="product in paginatedProducts" :key="product.id" class="flex justify-between border-b p-2">
          <span>

            {{ product.name }} -

            {{ product.description }}</span>
          <button @click="deleteProduct(product.id)" class="text-red-500">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Pagination -->
    <div class="mt-4">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="!hasMorePages">Next</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'

export default {
  name: 'ProductIndex',
  setup() {

    const router = useRouter();

    const newProduct = () => {
      router.push('/products/create');
    }
    // Dummy Product Data
    const products = ref([
      { id: 1, name: 'Product A', description: 'Description A', category_id: 1 },
      { id: 2, name: 'Product B', description: 'Description B', category_id: 2 },
      { id: 3, name: 'Product C', description: 'Description C', category_id: 1 },
      { id: 4, name: 'Product D', description: 'Description D', category_id: 3 },
      { id: 5, name: 'Product E', description: 'Description E', category_id: 2 },
      { id: 6, name: 'Product F', description: 'Description F', category_id: 3 },
      { id: 7, name: 'Product G', description: 'Description G', category_id: 1 },
      { id: 8, name: 'Product H', description: 'Description H', category_id: 2 },
      // More dummy data as needed...
    ]);

    const categories = ref([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ]);

    const searchQuery = ref('');
    const selectedCategory = ref('');
    const filteredProducts = ref([...products.value]);

    const currentPage = ref(1);
    const itemsPerPage = 3;

    const filterProducts = () => {
      let tempProducts = [...products.value];

      // Apply search filter
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase();
        tempProducts = tempProducts.filter(product =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      }

      // Apply category filter
      if (selectedCategory.value) {
        tempProducts = tempProducts.filter(
          product => product.category_id === parseInt(selectedCategory.value)
        );
      }

      filteredProducts.value = tempProducts;
      currentPage.value = 1; // Reset to first page when filtering
    };

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / itemsPerPage);
    });

    const hasMorePages = computed(() => {
      return currentPage.value < totalPages.value;
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const deleteProduct = (id) => {
      const index = products.value.findIndex(product => product.id === id);
      if (index !== -1) {
        products.value.splice(index, 1);
        filterProducts(); // Reapply filters after deletion
      }
    };

    onMounted(() => {
      filterProducts(); // Apply filters on mount
    });

    return {
      searchQuery,
      selectedCategory,
      categories,
      paginatedProducts,
      currentPage,
      hasMorePages,
      filterProducts,
      prevPage,
      nextPage,
      deleteProduct,
      newProduct
    };
  },
};
</script>

<style scoped>
/* Add basic styling if needed */
</style>
