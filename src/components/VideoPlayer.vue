<template>
    <div>
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
        <source :src="videoUrl" type="video/mp4">
        </video>
    </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import videojs from "video.js";

export default {
    props: {
        videoUrl: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const videoPlayer = ref(null);
        let player;

        onMounted(() => {
            player = videojs(videoPlayer.value, {
                controls: true,
                preload: 'auto',
                width: 640,
                height: 264
        });

            updateVideoSource(props.videoUrl);
        });

        onBeforeUnmount(() => {
        if (player) {
            player.dispose();
        }
        });

        watch(() => props.videoUrl, (newUrl) => {
            updateVideoSource(newUrl);
        });

        const updateVideoSource = (url) => {
            if (player) {
                player.src({ type: 'video/mp4', src: url });
                player.load();
            }
        };

        return {
            videoPlayer
        };
    }
};
</script>

<style scoped>
    .video-js {
        margin: 20px auto;
    }
</style>
