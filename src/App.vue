<template>
  <div class="w-screen h-screen flex overflow-hidden">
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
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
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

      return {
        showSide,
        toggleSideBar
      };
    }
  });
</script>

<style scoped>
</style>