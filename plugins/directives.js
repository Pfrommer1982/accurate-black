// plugins/directives.js
import { defineNuxtPlugin } from '#app'
import vLazy from '../directives/v-lazy'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', vLazy)
})
