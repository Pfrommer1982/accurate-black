export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth } = useNuxtApp();
  
    if (!$auth || !$auth.currentUser) {
      return navigateTo('/login');
    }
  });
  


