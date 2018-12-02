<!--suppress JSUnusedGlobalSymbols -->
<template>
  <div class="table">
    <el-table :data="data" stripe class="table" @row-click="onRowClick" :row-style="{cursor: 'pointer'}">
      <el-table-column prop="id" label="Номер задачи"></el-table-column>
      <el-table-column prop="title" label="Заголовок"></el-table-column>
      <el-table-column prop="date" label="Дата выполнения"></el-table-column>
    </el-table>

    <el-dialog :visible.sync="detailed" @close="onDetailedViewClose" :title="task.title">
      <table class="detailed" v-loading="loading">
        <tr v-for="(label, attribute) in attributes" :key="attribute">
          <td>
            <span class="attribute">{{ label }}</span>
          </td>
          <td>
            <el-input :type="getInputType(attribute)" disabled v-model="task[attribute]"></el-input>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },

  data () {
    return {
      loading: false,
      task: {},
      detailed: false,
      attributes: {
        id: 'Номер',
        title: 'Заголовок',
        date: 'Дата выполнения',
        author: 'Автор',
        status: 'Статус',
        description: 'Описание'
      }
    }
  },

  async created () {
    const match = this.$route.path.match(/task\/(?<id>\d+)/)
    if (match && match.groups.id) {
      this.detailed = true
      await this.loadTask(Number(match.groups.id))
    }
  },

  methods: {
    async onRowClick (task) {
      this.pushState( `/task/${task.id}`)
      this.detailed = true
      await this.loadTask(task.id)
    },

    async loadTask (id) {
      this.loading = true
      this.task = await this.$store.dispatch('loadTask', id)
      this.loading = false
    },

    onDetailedViewClose () {
      this.pushState('/')
      this.detailed = false
    },

    getInputType (attribute) {
      return attribute === 'description' ? 'textarea' : 'text'
    },

    pushState (url, title = null, data = {}) {
      window.history.pushState(data, title || window.document.title, url)
    }
  }
}
</script>

<style scoped lang="sass">
  .table
    width: 100%

    .detailed
      width: 100%
      td
        padding: 20px 0
</style>
