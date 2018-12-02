<template>
  <div class="paginator">
    <el-pagination background
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="onPaginationSizeChange"
                   @current-change="onPaginationCurrentChange"
                   :current-page="page"
                   :page-sizes="sizes"
                   :page-size="size"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    size: Number,
    total: Number
  },
  data () {
    return {
      sizes: [10, 50, 100, 500, 1000]
    }
  },

  methods: {
    onPaginationSizeChange (size) {
      this.$emit('size-change', size)
    },

    onPaginationCurrentChange (page) {
      this.$emit('current-change', page)
    }
  }
}
</script>
