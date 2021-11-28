<template>
  <div class="hero">
    <router-link :to="{ name: 'HeroDetail', params: { id: heroInfo.id } }">
      <img
        class="hero__image"
        :src="`${heroInfo.thumbnail.path}.${heroInfo.thumbnail.extension}`"
      />
      <h5 class="hero__title">{{ heroInfo.name }}</h5>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeroItem",
  props: {
    heroInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-top: 0;
  }

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
    box-shadow: 0px 0px 8px -2px #000000;
  }
}
</style>
