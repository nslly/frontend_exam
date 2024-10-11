<template>
    <div>
        <!-- Video Player Container -->
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" :data-setup="{}"></video>
    </div>
</template>

<script>
import videojs from "video.js";

export default {
    name: "VideoPlayer",
    props: {
        videoUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            player: null,
        };
    },
    watch: {
        // Watch for video URL changes
        videoUrl(newUrl) {
            if (this.player) {
                this.player.src({ type: "video/mp4", src: newUrl });
                this.player.play();
            }
        },
    },
    mounted() {
        // Initialize Video.js player
        this.player = videojs(this.$refs.videoPlayer, {
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
        });

        // Set initial video URL
        this.player.src({ type: "video/mp4", src: this.videoUrl });
    },
    beforeUnmount() {
        // Destroy the player instance when the component is destroyed
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>

<style scoped>
.video-js {
    width: 100%;
    height: auto;
    max-width: 800px;
    margin: 0 auto;
}
</style>