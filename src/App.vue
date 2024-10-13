<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <template v-if="isAuthenticated">
      <!-- Sidebar -->
      <Sidebar :showSide="showSide" />

      <!-- Main content -->
      <div class="w-full bg-gray-100">
        <!-- Navbar -->
        <Navbar @toggle-sidebar="toggleSideBar" />

        <div class="p-6">
          <RouterView />
        </div>
      </div>
    </template>

    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  setup() {
    const showSide = ref(true);

    const toggleSideBar = () => {
      showSide.value = !showSide.value;
    };

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('token');
    });

    return {
      showSide,
      toggleSideBar,
      isAuthenticated,
    };
  }
});
</script>

<style scoped>
</style>