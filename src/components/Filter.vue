<template>
  <div class="filter" @input="onInput">
    <el-input placeholder="Поиск" v-model="internal"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },

  data () {
    return {
      internal: ''
    }
  },

  methods: {
    onInput ($event) {
      this.internal = $event.target.value
      this.$emit('input', this.internal)
    }
  }
}
</script>

<style scoped lang="sass">
  .filter
    width: 100%
</style>
