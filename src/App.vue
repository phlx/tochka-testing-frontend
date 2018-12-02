<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
  body
    font-family: 'Fira Sans', Tahoma, Helvetica, Arial, sans-serif

  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    width: 960px
    margin: 0 auto
    height: 100%

    .el-pagination
      display: flex
      flex-flow: row wrap
      justify-content: center
      .el-select .el-input
        width: 150px
</style>
