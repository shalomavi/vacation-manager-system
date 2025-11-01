<template>
  <div>
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Start</th>
          <th>End</th>
          <th>Reason</th>
          <th>Status</th>
          <th v-if="showActions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in requests" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.user_name || r.user_id }}</td>
          <td>{{ r.start_date }}</td>
          <td>{{ r.end_date }}</td>
          <td>{{ r.reason || '-' }}</td>
          <td>{{ r.status }}</td>
          <td v-if="showActions">
            <button class="approve" @click="$emit('approve', r)">Approve</button>
            <button class="reject" @click="$emit('reject', r)">Reject</button>
          </td>
        </tr>
        <tr v-if="!requests || requests.length === 0">
          <td colspan="7">No requests found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RequestList',
  props: {
    requests: { type: Array, default: () => [] },
    showActions: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button.approve {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    background-color: #45a049;
  }
}
button.reject {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
}
</style>