<template>
  <div class="search">
    <search-header>

    </search-header>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchHeader from '@/components/SearchHeader.vue'
export default {
  name: 'Home',
  components: {
    SearchHeader
  }
}
</script>