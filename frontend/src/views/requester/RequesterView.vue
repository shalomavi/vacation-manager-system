<template>
  <div class="requester-view">
    <RequesterInterface />
  </div>
</template>

<script>
import RequesterInterface from '@/components/RequesterInterface.vue'

export default {
  components: {
    RequesterInterface,
  }
}
</script>

<style scoped>
.requester-view {
  padding: 20px;
}
</style>