<template>
  <div>
    <popup-picker :data="areaList"
                  :placeholder="areaPlaceholder"
                  style="margin-left:-.33rem"
                  :columns="3"
                  popup-title="选择地区"
                  :show-name="true"
                  value-text-align="left"
                  v-model="pickerModel"
                  @on-hide="pickHide"
                  @on-change="change">
    </popup-picker>
  </div>
</template>

<script>
  import { PopupPicker } from 'vux'
  export default {
    components: {
      PopupPicker
    },
    data: function () {
      return {
        pickerModel: [],
        areaList: []
//        dataSource: [{name: '我', value: 'a1', parent: 0},
//          {name: '你', value: 'a2', parent: 'a1'},
//          {name: '他', value: 'a3', parent: 'a1'},
//          {name: '嘿', value: 'a4', parent: 'a2'},
//          {name: '哈', value: 'a5', parent: 'a2'},
//          {name: '嘎', value: 'a6', parent: 'a3'},
//          {name: '吼', value: 'a7', parent: 'a3'}
//        ]
      }
    },
    props: {
      valueModel: {
        type: Array
      },
      dataSource: {
        type: Array
      },
      areaPlaceholder: {
        type: String
      }
    },
    methods: {
      pickHide: function () {},
      change: function (a) {
        console.log(a,'12121212')
//        console.log(this.valueModel,'areaSelect~~~~~~~~~~~')
        this.$emit('pickerConfirmAction',this.pickerModel)
      }
    },
    mounted: function () {
    },
    watch: {
      valueModel: function (nv) {
        if (nv && nv.length) {
          this.pickerModel = nv
        }
      },
      dataSource: function (nv) {
        if (nv && nv.length) {
          this.areaList = nv
        }
      }
    }
  }
</script>
