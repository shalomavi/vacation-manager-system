<template>
  <div class="requester-interface">
    <div style="display:flex;align-items:flex-end; justify-content: end;">
      <router-link class="back-btn" to="/">← Home</router-link>
    </div>

    <h1>Vacation Request Form</h1>
    <RequestForm @submit="handleSubmit" />
    <h2>Your Submitted Requests</h2>
    <RequestList :requests="submittedRequests" />
  </div>
</template>

<script>
import RequestForm from './RequestForm.vue'
import RequestList from './RequestList.vue'
import api from '../services/api' // Make sure you import your API service
import { useUserStore } from '@/stores/user'

export default {
  name: 'RequesterInterface',
  components: {
    RequestForm,
    RequestList,
  },
  data() {
    return {
      submittedRequests: [],
    }
  },
  // When the component loads, fetch the data from the backend
  async created() {
    await this.fetchRequests()
  },
  methods: {
    async fetchRequests() {
      try {
        // 1. Access the store safely within a method/hook
        const userStore = useUserStore(); 
        const userId = userStore.user.id; 

        if (!userId) {
            console.error("User ID not found, cannot fetch requests.");
            return;
        }

        const { data } = await api.get('/requests', { 
            params: { userId: userId } 
        });
        

        this.submittedRequests = data;


      } catch (err) {
        console.error('Error fetching user requests:', err);
      }
    },
    async handleSubmit() {
      await this.fetchRequests()
    },
  },
}
</script>

<style scoped>
.requester-interface {
  padding: 20px;
}
.back-btn {
  text-decoration: none;
  color: #2c3e50;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f7f7f7;
}
.back-btn:hover {
  background: #eef2f5;
}
</style>
