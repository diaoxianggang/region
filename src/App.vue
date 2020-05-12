<template>
  <div class="region-wrapper">
    <bq-region
      ref="region"
      @regionEnd="selectItem"
      @selectItem="selectItem"
    >
      <bq-region-item
        v-for="i in grid"
        :key="i.id"
        :selected-key="i.id"
        border="none"
      >
        <div style="width: 200px;height: 200px;background-color: #CCC;">
          {{ i.title }}
        </div>
      </bq-region-item>
    </bq-region>
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
    onSelectAllChange (val) {
      this.selectAll = !this.selectAll
      this.checkboxLabel = this.selectAll ? '取消全选' : '全选'
      if (this.selectAll) {
        this.$refs.region.selectAll()
      } else {
        this.$refs.region.clearSelected()
      }
    },
    getSelectItem () {
      return this.$refs.region.getSelectItem()
    },
    clearSelected () {
      this.$refs.region.clearSelected()
      this.selectIds = []
    },
    selectItem () {
      const dataLen = this.grid.length
      this.selectIds = this.getSelectItem()
      if (this.selectIds.length !== dataLen) {
        this.selectAll = false
      } else {
        this.selectAll = true
      }
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.contextMenuVisible = false
    })
  }
}
</script>

<style lang="scss" scoped>
.service-container{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .toolbar {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    .checkbox {
      display: flex;
      align-items: center;
    }
  }
  #gplot {
    flex: 1;
    width: 100%;
  }
  .region-wrapper {
    width: 100%;
    height: calc(100% - 42px);
    overflow: auto;
    .context-menu-wrapper {
      position: absolute;
      z-index: 1;
      background-color: #fff;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          padding: 5px 15px;
          border-top: 1px solid #EEE;
          &:hover {
          cursor: pointer;
            background-color: rgba(162, 204, 253, 0.37)
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #EEE;
    }
    .add-service-item {
      cursor: pointer;
      &:hover {
        color: #0070cc;
        box-shadow: 0 0 15px 4px rgb(130, 186, 255) !important;
        border-color: rgb(130, 186, 255);
      }
      .add-service-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 32px;
      }
    }
  }
}
</style>
