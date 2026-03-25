<script setup>
import { ref, onMounted } from 'vue';
import { fetchLatestVideos } from '~/composables/youtube-api';

const youtubeVideos = ref([]);
const ytLoading = ref(true);

onMounted(async () => {
  ytLoading.value = true;
  youtubeVideos.value = await fetchLatestVideos(12);
  ytLoading.value = false;
});
</script>

<template>
  <section class="media-section">
    <div class="break-line top">
      <p class="break-line-text">YOUTUBE LATEST</p>
    </div>

    <div v-if="ytLoading" class="loader">Loading YouTube Videos...</div>
    <div v-else-if="youtubeVideos.length" class="video-grid">
      <a v-for="video in youtubeVideos" :key="video.id.videoId" class="video-card"
        :href="`https://www.youtube.com/watch?v=${video.id.videoId}`" target="_blank"
        v-motion-slide-visible-once-bottom>
        <div class="video-wrapper">
          <NuxtImg :src="video.snippet.thumbnails.high.url" alt="YouTube Thumbnail" class="thumbnail" loading="lazy" />
          <div class="play-icon">
            <Icon name="bi:play-fill" />
          </div>
        </div>
        <div class="video-info">
          <h3 class="video-title">{{ video.snippet.title }}</h3>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.media-section {
  padding: var(--spacing-md) 2rem var(--spacing-xl) 2rem;
  overflow: hidden;

  @include respond(phone) {
    padding: var(--spacing-sm) 1rem var(--spacing-lg) 1rem;
  }
}

.loader {
  text-align: center;
  color: var(--primary-grey-light2);
  padding: 2rem 0;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.video-card {
  display: block;
  text-decoration: none;
  background-color: var(--primary-grey-dark-opacity);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    .play-icon {
      background-color: var(--primary-grey-light1);
      color: #000;
    }
  }
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.video-info {
  padding: 1rem;
}

.video-title {
  color: var(--primary-grey-light1);
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
