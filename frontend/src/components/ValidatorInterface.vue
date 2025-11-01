<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:center;margin-bottom:12px">
      <div class="header-container">
        <h2>Validator Dashboard</h2>
      </div>
      <router-link class="back-btn" to="/">← Home</router-link>
    </div>

    <div style="margin-bottom:8px">
      <label>Filter: </label>
      <select v-model="filter" @change="fetchAll">
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <button @click="fetchAll" style="margin-left:8px">Refresh</button>
    </div>

    <request-list
      :requests="requests"
      :show-actions="true"
      @approve="onApprove"
      @reject="onReject"
    />
  </div>
</template>

<script>
import RequestList from './RequestList.vue'
import api from '../services/api'

export default {
  name: 'ValidatorInterface',
  components: { RequestList },
  data() {
    return { requests: [], filter: '' }
  },
  async created() {
    await this.fetchAll()
  },
  methods: {
    async fetchAll() {
      try {
        const params = {}
        if (this.filter) params.status = this.filter
        const { data } = await api.get('/requests', { params })
        this.requests = data
      } catch (err) {
        console.error(err)
      }
    },
    async onApprove(request) {
      try {
        await api.patch(`/requests/${request.id}`, { status: 'approved', comments: '' })
        this.fetchAll()
      } catch (err) {
        console.error(err)
      }
    },
    async onReject(request) {
      const comments = window.prompt('Optional rejection comment:')
      try {
        await api.patch(`/requests/${request.id}`, { status: 'rejected', comments })
        this.fetchAll()
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
}

h2 {
  margin-bottom: 1rem;
  margin-inline-end: auto;
}
.back-btn {
  text-decoration: none;
  color: #2c3e50;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f7f7f7;
  margin-inline-start: auto;
}
.back-btn:hover {
  background: #eef2f5;
}
select {
  padding: 4px;
  margin-left: 4px;
  border: 1px solid #ccc;
  &:focus {
    outline: 1px solid #434343;
  }
}
button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #369e6b;
}
</style>