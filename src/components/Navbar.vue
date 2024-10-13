<template>
    <div class="bg-white flex items-center shadow-sm px-6 w-full py-[9px] z-10 border-b">
        <div class="cursor-pointer w-[30px]" @click="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[25px] h-[25px]">
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32 32z" />
            </svg>
        </div>

        <div class="w-full flex justify-center">
            <form class="flex items-center w-[500px]">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-auto text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                    </div>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-sm rounded-lg pl-10 p-2.5 w-full"
                        placeholder="Search..." />
                </div>
            </form>
        </div>

        <div class="relative flex items-center justify-end space-x-4">
            <div class="font-semibold">
                <div class="text-xs text-gray-500">Admin</div>
            </div>
            <div>
                <button @click="toggleDropdown" class="relative inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div v-if="dropdownOpen" class="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
                    <div class="py-1">
                        <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'Navbar',
    emits: ['toggle-sidebar'],
    setup(props, { emit }) {
        const dropdownOpen = ref(false);

        const toggleSidebar = () => {
            emit('toggle-sidebar');
        };

        const toggleDropdown = () => {
            dropdownOpen.value = !dropdownOpen.value;
        };

        const logout = async () => {
            try {
                await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                localStorage.removeItem('token');
                
                window.location.href = '/login'; 
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        return {
            toggleSidebar,
            toggleDropdown,
            logout,
            dropdownOpen,
        };
    }
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
