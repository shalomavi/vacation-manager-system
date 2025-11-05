<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="name" type="Text" placeholder="User Name" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="role" type="Text" placeholder="Role" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'

  const name = ref('')
  const password = ref('')
  const error = ref('')
  const role = ref('requester')
  const router = useRouter()
  const userStore = useUserStore()

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, password: password.value, role: role.value}),
      })

      if (!response.ok) {   
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
      userStore.setUser(data.user)
      // localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.role === 'validator') {
        router.push('/validator')
        return
      }
      router.push('/requester')
    } catch (err) {
      error.value = err.message
    }
  }

</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
.error {
  color: red;
}
</style>
