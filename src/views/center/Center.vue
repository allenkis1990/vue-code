<template>
  <div>
    <ul v-for="item in listData">
      <div>
        <div>{{item.name}}</div>
        <div>{{item.tel}}</div>
      </div>
    </ul>
  </div>
</template>
<script>
  import Cell from '../../../node_modules/vux/src/components/cell/index.vue'

  export default {
    components: {Cell},
    data: function () {
      return {
        listData: [{name: '张三', tel: '15013884991'}, {name: '李四', tel: '15013884992'}]
      }
    }
  }
</script>

