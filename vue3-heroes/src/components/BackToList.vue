<template>
  <div class="back-to-list">
    <router-link :to="{name: 'HeroesList'}">
      Back to Heroes
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BackToList',
}
</script>
