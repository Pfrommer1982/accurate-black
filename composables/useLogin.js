import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseClientApp } from '~/utils/firebaseClient';

export default function useLogin() {
  const error = ref(null);
  const login = async (email, password) => {
    try {
      const auth = getAuth(getFirebaseClientApp());
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      error.value = null;
      return userCredential.user;
    } catch (err) {
      console.error('Login error:', err.message);
      error.value = err.message;
    }
  };

  return { login, error };
}
