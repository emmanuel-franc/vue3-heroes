<template>
  <div class="pagination">
    <button class="pagination__prev" :class="{'pagination--disabled': currentPage <= 1}" type="button" @click="prev()">&#60;</button>
    <button class="pagination__next" :class="{'pagination--disabled': currentPage === totalPages}" type="button" @click="next()">&#62;</button>

    <p class="pagination__counter">
      {{ currentPage }} / {{ totalPages }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore, mapActions } from 'vuex'
import { OFFSET_BASE_VALUE } from '../constants/constants.js'

export default {
  name: 'HeroItem',
  setup() {
    const store = useStore()

    const total = computed(() => store.state.total)
    const currentPage = computed(() => store.state.currentPage)

    return {
      total,
      currentPage,
    }
  },
  methods: {
    ...mapActions(['UPDATE_CURRENT_PAGE']),

    prev() {
      if(this.currentPage > 1) {
        this.UPDATE_CURRENT_PAGE(this.currentPage - 1)
        this.$router.replace({ name: 'HeroesList', params: { pageNumber: this.currentPage } })
      }
    },
    next() {
      if(this.currentPage < this.totalPages) {
        this.UPDATE_CURRENT_PAGE(this.currentPage + 1)
        this.$router.replace({ name: 'HeroesList', params: { pageNumber: this.currentPage } })
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / OFFSET_BASE_VALUE)
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  &__prev,
  &__next,
  &__counter {
    position: fixed;
  }

  &__prev,
  &__next {
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border: 4px solid #fff;
    outline: 2px solid #00a1ff;
    border-radius: 50%;
    font-size: 25px;
    color: #fff;
    background: #00a1ff;
    cursor: pointer;
    transition: background-color 0.4s, outline 0.4s;
    box-shadow: 0px 0px 8px -2px #000000;

    &:hover:not(.pagination--disabled) {
      background-color: #0077ff;
      outline: 2px solid #00a1ff;
    }

    &:active:not(.pagination--disabled) {
      box-shadow: 0px 0px 0px 0px #000000;
    }
  }

  &--disabled {
    background-color: #8299b3;
    outline: 2px solid #8299b3;
  }

  &__prev {
    left: 10px;
  }

  &__next {
    right: 10px;
  }

  &__counter {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }
}
</style>
