<template>
  <div class="back-to-list">
    <router-link :to="{name: 'HeroesList', params: { pageNumber: currentPage}}">
      Back to Heroes
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'BackToList',
  setup() {
    const store = useStore()

    const currentPage = computed(() => store.state.currentPage)

    return {
      currentPage,
    }
  }
}
</script>
