import { onAuthStateChanged } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return;
  }

  const { $auth } = useNuxtApp();

  if (!$auth) {
    return navigateTo('/login');
  }

  const user = await new Promise((resolve) => {
    if ($auth.currentUser) {
      resolve($auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged($auth, (authUser) => {
      unsubscribe();
      resolve(authUser);
    });
  });

  if (!user) {
    return navigateTo('/login');
  }
});
