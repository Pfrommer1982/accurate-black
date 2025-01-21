import { onAuthStateChanged } from 'firebase/auth';

export default defineNuxtPlugin(nuxtApp => {
  const { $auth } = nuxtApp;

  onAuthStateChanged($auth, (user) => {
    if (user) {
    
      nuxtApp.vueApp.provide('user', user);
      nuxtApp.provide('user', user);
    } else {
    
      nuxtApp.vueApp.provide('user', null);
      nuxtApp.provide('user', null);
    }
  });
});
