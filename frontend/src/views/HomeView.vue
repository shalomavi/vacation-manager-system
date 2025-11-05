<template>
  <div class="home">
    <div>
      <button @click="handleLogout">Logout</button>
    </div>
    <h1>Welcome to the Vacation Management System</h1>
    <p>This application allows employees to request vacations and managers to review and manage those requests.</p>
    <router-link to="/requester" class="btn">Go to Requester Interface</router-link>
    <router-link to="/validator" class="btn">Go to Validator Interface</router-link>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
export default {
  name: 'HomeView',
  methods: {
    handleLogout() {
      const userStore = useUserStore()
      userStore.logout()
      this.$router.push('/login');
    },
  },
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #369e6b;
}
</style>