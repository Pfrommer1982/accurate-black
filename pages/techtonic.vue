<script setup lang="ts">
type RadioshowItem = { title: string; link: string; pubDate: string; embedLink: string; embedHtml: string }
type SoundcloudResponse =
  | { count: number; source: string; items: RadioshowItem[] }
  | { error: string; details: string; timestamp: string; triedUrls: string[] }

const { data, error: fetchError } = await useAsyncData('soundcloud-list', () => $fetch<SoundcloudResponse>('/api/soundcloud'))

const radioshowList = computed<RadioshowItem[]>(() => {
  if (data.value && !('error' in data.value)) {
    return data.value.items || []
  }
  return []
})

const error = computed(() => {
  if (fetchError.value) return 'Netwerkfout bij het laden van radioshows'
  if (data.value && 'error' in data.value) return data.value.error
  return ''
})

usePageSeo('Techtonic')
useHead({
  title: 'Techtonic'
})
</script>

<template>
  <section class="section-radioshow">
    <div v-once class="break-line top">
      <p class="break-line-text">TECHTONIC BY ROBBI ALTIDORE</p>
    </div>
    <h4>ACCURATE BLACK PRESENTS :</h4>
    <div class="header">
      <h1 class="h1 inprogress">
        ROBBI ALTIDORE - TECHTONIC
        <a
          href="https://inprogressradio.com/index.php/members/robbi-altidore/"
          target="_blank"
        >@INPROGRESSRADIO.COM</a>
      </h1>
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <!-- Radioshows lijst -->
    <ul v-else-if="radioshowList.length > 0">
      <li v-for="(radioshow, index) in radioshowList" :key="index">
        <div class="radioshow-info">
          <h3>{{ radioshow.title }}</h3>
          <p class="date">{{ new Date(radioshow.pubDate).toLocaleDateString('nl-NL') }}</p>
        </div>
        
        <div class="sc-embed" v-html="radioshow.embedHtml" title="soundcloud-embed"></div>
        
        <div v-once class="break-line top">
          <p class="break-line-text"></p>
        </div>
      </li>
    </ul>
    
    <!-- Geen radioshows -->
    <div v-else class="no-shows">
      <p>Geen radioshows gevonden</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-radioshow {
  padding: 0 2rem;
  overflow: hidden;
  @include respond(phone) {
    padding: 0 1rem;
  }
}

.headers {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: var(--primary-grey-light1);
}

.sc-embed {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.radioshow-info {
  margin-top: 3rem;
  
  h3 {
    color: var(--primary-grey-light1);
    margin-bottom: 0.5rem;
  }
}

.date {
  color: var(--primary-grey-light2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.loading, .error, .no-shows {
  text-align: center;
  padding: 2rem;
  color: var(--primary-grey-light2);
}

.error {
  color: #ff5500;
}

a {
  text-decoration: none;
  color: var(--primary-grey-light2);
  &:hover {
    color: var(--primary-grey-light1);
  }
}

h4 {
  margin-top: 2rem;
  font-size: 2rem;
  @include respond(phone) {
    font-size: 1.6rem;
  }
}
</style>