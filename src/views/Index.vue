<!--suppress JSUnusedGlobalSymbols -->
<template>
  <div class="index">
    <the-filter class="filter" v-model="filter"></the-filter>

    <div class="loading" v-loading="loading">
      <the-table class="table" :data="current.view"></the-table>

      <div class="pagination">
        <the-paginator class="paginator" :page="current.page" :size="current.size" :total="current.total"
                       @size-change="onPaginationSizeChange"
                       @current-change="onPaginationCurrentChange">
        </the-paginator>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TheFilter from '../components/Filter'
import TheTable from '../components/Table'
import ThePaginator from '../components/Paginator'

export default {
  components: {
    TheFilter,
    TheTable,
    ThePaginator
  },

  data () {
    return {
      loading: true,
      filter: '',
      current: {
        page: 1,
        total: 0,
        size: 10,
        filtered: [],
        view: []
      },
      detailed: false
    }
  },

  async created () {
    await this.$store.dispatch('loadAll')
    this.loading = false
    this.sliceTasksView()
  },

  methods: {
    async sliceTasksView () {
      this.current.filtered = this.filter
        ? this.tasks.filter(task => task.index.includes(this.filter.toLowerCase()))
        : this.tasks

      const start = (this.current.page - 1) * this.current.size
      const end = start + this.current.size
      this.current.view = this.current.filtered.slice(start, end)
      this.current.total = this.current.filtered.length
    },

    onPaginationSizeChange (size) {
      this.current.size = size
      this.sliceTasksView()
    },

    onPaginationCurrentChange (page) {
      this.current.page = page
      this.sliceTasksView()
    }
  },

  computed: {
    tasks () {
      return Object.values(this.$store.state.tasks)
    }
  },

  watch: {
    filter: debounce(function () {
      this.sliceTasksView()
    }, 300)
  }
}
</script>

<style scoped lang="sass">
  .index
    margin-top: 100px

    .filter,
    .table,
    .paginator
      width: 100%
      margin-bottom: 20px
</style>
