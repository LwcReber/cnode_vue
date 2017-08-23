<template lang="html">
  <div class="return-btn icon-undo2" v-on:click="goBack"></div>
</template>

<script>
export default {
  methods: {
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
