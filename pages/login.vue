<template>
  <div class="admin">
    <div class="break-line top">
      <p class="break-line-text" v-once>ADMIN</p>
    </div>
    <section v-once class="section-admin">
      <form @submit.prevent="handleSubmit" class="form-admin">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
        <button type="submit">Log in</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '../composables/useLogin';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const { login, error } = useLogin();
    const router = useRouter();

    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push('/admin/releasesform');
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style scoped lang="scss">

.section-admin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.admin {
  padding: 0 2rem;
}
.form-admin {
  width: 30rem;
  padding: 1.5rem;
  border: 1px solid var(--primary-grey-light2);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-10rem);
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-grey-light1);
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
}
button:hover {
  background-color: #45a049;
}
.error {
  color: red;
}
</style>
