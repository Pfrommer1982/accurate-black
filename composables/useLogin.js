import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function useLogin() {
  const error = ref(null);
  const { $auth } = useNuxtApp();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      error.value = null;
      return userCredential.user;
    } catch (err) {
      console.error('Login error:', err.message);
      error.value = err.message;
    }
  };

  return { login, error };
}
