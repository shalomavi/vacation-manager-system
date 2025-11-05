<template>
  <div class="request-form">
    <h2>Submit Vacation Request</h2>
    <form @submit.prevent="submitRequest">
      <div class="form-group">
        <label for="start-date">Start Date:</label>
        <input type="date" v-model="startDate" required />
      </div>
      <div class="form-group">
        <label for="end-date">End Date:</label>
        <input type="date" v-model="endDate" required />
      </div>
      <div class="form-group">
        <label for="reason">Reason:</label>
        <textarea v-model="reason"></textarea>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { submitVacationRequest } from '@/services/api';


export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      reason: '',
    };
  },
  computed: {
    user() {
      return useUserStore().user;
    }

  },
  methods: {
    async submitRequest() {
      try {
        const requestData = {
          user_id: this.user.id,
          user_name: this.user.name,
          start_date: this.startDate,
          end_date: this.endDate,
          reason: this.reason,
        };
        const response = await submitVacationRequest(requestData);
        this.resetForm();
        this.$emit('request-submitted', response);
      } catch (error) {
        console.error('Error submitting request:', error.message);
      }
    },
    resetForm() {
      this.startDate = '';
      this.endDate = '';
      this.reason = '';
    },
  },
};
</script>


<style scoped>
.request-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.request-form h2 {
  text-align: center;
}
.request-form form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 15px;
}
.request-form label {
  margin: 10px 0 5px;
  font-weight: bold;
}
.request-form .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.request-form input,
.request-form textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.request-form textarea {
  resize: vertical;
  min-height: 100px;
}
.request-form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  align-self: center;
  width: 100%;
}
.request-form button:hover {
  background-color: #45a049;
}
</style>
