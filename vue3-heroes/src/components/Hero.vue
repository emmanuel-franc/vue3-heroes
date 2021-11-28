<template>
  <div class="hero">
    <img class="hero__image" :src="`${heroInfo.thumbnail.path}.${heroInfo.thumbnail.extension}`" />
    <h5 class="hero__title">{{ heroInfo.name }}</h5>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    heroInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    
  }

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
    outline: 2px solid #00a1ff;
  }
}
</style>
