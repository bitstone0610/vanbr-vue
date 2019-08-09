<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Card',
  };
</script>

<style lang="scss" scoped>
  .card {
    border: none;
    box-shadow: 0 2px 4px 0 #ccc;
    max-width: 425px;
    padding: 20px 32px;
  }

  @media(max-width: 768px) {
    .card {
      padding: 20px;
    }
  }
</style>
