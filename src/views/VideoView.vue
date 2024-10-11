<template>
    <div class="container mx-auto">
        <h1 class="text-xl font-bold mb-4">Videos</h1>

        <div class="flex mb-4 space-x-4">
            <input v-model="videoUrl" placeholder="Enter video URL" class="border p-2 w-full" />
            <button @click="changeVideo" class="p-2 bg-blue-500 text-white">Play</button>
        </div>

        <!-- Video Player Component -->
        <VideoPlayer :videoUrl="currentVideoUrl" />

        <!-- Example Buttons for testing different videos -->
        <div class="mt-6">
            <button class="p-2 bg-gray-300" @click="currentVideoUrl = '/storage/videos/sample1.mp4'">
                Load Sample Video 1
            </button>
            <button class="p-2 bg-gray-300 ml-2" @click="currentVideoUrl = '/storage/videos/sample2.mp4'">
                Load Sample Video 2
            </button>
        </div>
    </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
    name: "Videos",
    components: {
        VideoPlayer,
    },
    data() {
        return {
            videoUrl: "",
            currentVideoUrl: "/storage/videos/sample1.mp4", // Default video
        };
    },
    methods: {
        changeVideo() {
            this.currentVideoUrl = this.videoUrl;
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}
</style>