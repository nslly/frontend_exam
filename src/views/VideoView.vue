<template>
    <div class="container mx-auto">
        <h1 class="text-xl font-bold mb-4 text-blue-600">Video Player Test</h1>

        <div class="flex mb-4 space-x-4">
            <input v-model="videoUrl" placeholder="http://localhost:8000/storage/videos/sample2.mp4" class="border text-slate-600 p-2 w-full" />
            <button @click="changeVideo" class="py-2 px-4 rounded-md hover:bg-blue-700 bg-blue-600 text-white">Play Video</button>
        </div>

        <VideoPlayer :videoUrl="currentVideoUrl" />

        <div class="mt-6 space-x-4">
            <button class="py-2 px-4 rounded-md hover:bg-blue-700 bg-blue-600 text-white" @click="currentVideoUrl = 'http://localhost:8000/storage/videos/sample1.mp4'">
                Load Sample Video 1
            </button>
            <button class="py-2 px-4 rounded-md hover:bg-blue-700 bg-blue-600 text-white" @click="currentVideoUrl = 'http://localhost:8000/storage/videos/sample2.mp4'">
                Load Sample Video 2
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import VideoPlayer from '@/components/VideoPlayer.vue'; 

export default {
    components: {
        VideoPlayer,
    },
    setup() {
        const videoUrl = ref(''); 
        const currentVideoUrl = ref('http://localhost:8000/storage/videos/sample1.mp4'); 

        const changeVideo = () => {
            currentVideoUrl.value = videoUrl.value;
        };

        return {
            videoUrl,
            currentVideoUrl,
            changeVideo,
        };
    },
};
</script>

<style scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
</style>
