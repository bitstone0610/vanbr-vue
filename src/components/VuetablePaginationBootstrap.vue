<template>
  <ul class="pagination">
    <li :class="{'disabled': isOnFirstPage}" class="page-item">
      <a href="" @click.prevent="loadPage('prev')" class="page-link">
        <span>&laquo;</span>
      </a>
    </li>

    <template v-if="notEnoughPages">
      <li v-for="n in totalPage" :class="{'active': isCurrentPage(n)}" class="page-item">
        <a @click.prevent="loadPage(n)" v-html="n" class="page-link"></a>
      </li>
    </template>
    <template v-else>
      <li v-for="n in windowSize" :class="{'active': isCurrentPage(windowStart+n-1)}" class="page-item">
        <a @click.prevent="loadPage(windowStart+n-1)" v-html="windowStart+n-1" class="page-link"></a>
      </li>
    </template>

    <li :class="{'disabled': isOnLastPage}" class="page-item">
      <a href="" @click.prevent="loadPage('next')" class="page-link">
        <span>&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import VuetablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin';

  export default {
    name: 'VuetablePaginationBootstrap',
    mixins: [VuetablePaginationMixin],
  };
</script>

<style scoped>

</style>
