<template>
    <div :class="['sidebar', { collapsed: !showSide }]"
        class="w-[300px] bg-[#343a40] text-white transition-all duration-300">
        <div class="py-4 px-8" v-if="showSide">
            <h3 class="font-bold text-xl">Admin</h3>
        </div>
        <div class="p-2" v-else>
            <h3
                class="font-bold flex justify-center text-xl bg-slate-100 rounded-full px-4 text-[#3f474e] text-center py-2">
                A</h3>
        </div>

        <hr />
        <div class="px-2 space-y-4">
            <div v-if="showSide" class="flex mt-6 w-full rounded-md bg-[#3f474e] justify-between border ">
                <input class="p-2 w-full text-sm bg-transparent text-slate-100" placeholder="Search" />
                <div class="px-3 flex justify-center items-center border-l">
                    <svg aria-hidden="true" class="w-5 h-auto text-white" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
            </div>

            <div class="flex flex-col justify-between ">
                <router-link to="/products" class="menu-item" :class="[
                    'inline-flex  mt-4 items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 transition duration-400 ease-in-out',
                    isActive('/products') ? 'bg-blue-600 text-gray-800' : 'hover:bg-blue-600 hover:text-white',
                    showSide ? 'justify-start' : 'justify-center items-center'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-[25px] h-[25px] fill-current"
                        viewBox="0 0 576 512">
                        <path
                            d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0L109.6 0C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9c0 0 0 0-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3L448 384l-320 0 0-133.4c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3L64 384l0 64c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-64 0-131.4c-4 1-8 1.8-12.3 2.3z" />
                    </svg>

                    <span class="ml-2" v-if="showSide">Products</span>
                </router-link>
            </div>
            <router-link to="/products/create" class="menu-item" :class="[
                'inline-flex mt-1 items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 transition duration-400 ease-in-out',
                isActive('/products/create') ? 'bg-blue-600 text-gray-800' : 'hover:bg-blue-600 hover:text-white',
                showSide ? 'justify-start' : 'justify-center items-center'
            ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-[25px] h-[25px] fill-current"
                    viewBox="0 0 512 512">
                    <path
                        d="M432 256c0 13.3-10.7 24-24 24H280v128c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H80c-13.3 0-24-10.7-24-24s10.7-24 24-24h152V104c0-13.3 10.7-24 24-24s24 10.7 24 24v128h128c13.3 0 24 10.7 24 24z" />
                </svg>
                <span class="ml-2" v-if="showSide">Create Product</span>
            </router-link>
            <div class="flex flex-col justify-between">
                <router-link to="/about" class="menu-item" :class="[
                    'inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 transition duration-400 ease-in-out',
                    isActive('/about') ? 'bg-blue-600 text-gray-800' : 'hover:bg-blue-600 hover:text-white',
                    showSide ? 'justify-start' : 'justify-center'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-[25px] h-[25px] fill-current"
                        viewBox="0 0 512 512">
                        <path
                            d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                    </svg>
                    <span class="ml-2" v-if="showSide">About</span>
                </router-link>
            </div>
            <div class="flex flex-col justify-between">
                <router-link to="/videos" class="menu-item" :class="[
                    'inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 transition duration-400 ease-in-out',
                    isActive('/videos') ? 'bg-blue-600 text-gray-800' : 'hover:bg-blue-600 hover:text-white',
                    showSide ? 'justify-start' : 'justify-center'
                ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-[25px] h-[25px] fill-current"
                        fill="currentColor" viewBox="0 0 512 512">
                        <path
                            d="M448 32l-86.1 0-1 1-127 127 92.1 0 1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128l0-64c0-15.1-5.3-29.1-14-40l-104 104L512 160zM294.1 32l-92.1 0-1 1L73.9 160l92.1 0 1-1 127-127zM64 32C28.7 32 0 60.7 0 96l0 64 6.1 0 1-1 127-127L64 32zM512 192L0 192 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224z" />
                    </svg>
                    <span class="ml-2" v-if="showSide">Videos</span>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const isActive = (path) => {
        return route.path === path;
    };

    defineProps({
        showSide: {
            type: Boolean,
            default: true,
        },
    });
</script>

<style scoped>
    .sidebar {
        width: 300px;
        transition: width 0.3s ease;
    }

    .sidebar.collapsed {
        width: 80px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 8px;
        transition: all 0.3s;
        border-radius: 0.375rem;
        color: white;
    }

    .menu-item svg {
        transition: transform 0.3s;
    }

    .sidebar.collapsed .menu-item span {
        display: none;
    }
</style>
