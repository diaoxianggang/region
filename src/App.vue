<template>
  <div class="region-wrapper">
    <bq-region
      ref="region"
      @regionEnd="regionEnd"
      @regionStart="regionStart"
    >
      <bq-region-item
        v-for="i in grid"
        :key="i.id"
        :selected-key="i.id"
        border="none"
      >
        <div style="width: 200px;height: 200px;background-color: rgba(136, 244, 255, 0.59);font-size: 32px;text-align: center;line-height: 200px;">
          {{ i.title }}
        </div>
      </bq-region-item>
    </bq-region>
    <button @click="handleSelectAll">全选</button>
    <button @click="handleCancelSelect">取消选择</button>
    <button @click="handleGetSelect">获取选项</button>
  </div>
</template>

<script>
import BqRegion from './lib/region/Region.vue'
import BqRegionItem from './lib/regionItem/RegionItem.vue'
export default {
  name: 'region',
  components: {
    BqRegion,
    BqRegionItem
  },
  data () {
    return {
      grid: [{
        id: 'abc',
        title: '蒙'
      }, {
        id: 'abce',
        title: '奇'
      }, {
        id: 'abcf',
        title: '·'
      }, {
        id: 'abcg',
        title: 'D'
      }, {
        id: 'abch',
        title: '·'
      }, {
        id: 'abci',
        title: '路'
      }, {
        id: 'abcj',
        title: '飞'
      }]
    }
  },
  methods: {
    // 点击全选按钮
    handleSelectAll () {
      this.$refs.region.selectAll()
    },
    // 点击取消选择
    handleCancelSelect () {
      this.$refs.region.clearSelected()
    },
    // 点击获取选贼数据
    handleGetSelect () {
      alert(this.getSelectItem())
    },
    // 选择开始
    regionStart () {
      console.log('选择开始')
    },
    // 选择结束
    regionEnd () {
      alert(this.getSelectItem())
    },
    // 获取选择的数据
    getSelectItem () {
      return this.$refs.region.getSelectItem()
    },
  }
}
</script>
