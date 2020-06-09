# region

> vue 的框选组件

## 举个栗子：
```vue
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
```
## 参数
### Region 选框
| 参数 | 说明 |  默认值 | 必填 |
|:--:|:--:|:--:|:--:|
|border|选择框边框|'1px dotted #368cd4'|非必填|
|backgroundColor|选择框背景颜色|'rgba(51, 168, 230, 0.35)'|非必填|

### RegionItem 选项
| 参数 | 说明 |  默认值 | 必填 |
|:--:|:--:|:--:|:--:|
|width|宽度|auto|非必填|
|height|高度|auto|非必填|
|boxShadow|选项框选中的边框阴影|'0 0 15px 4px rgb(130, 186, 255)'|非必填|
|border|选项框的边框|'1px solid #666'|非必填|
|disabled|选项框是否能被选中|false|非必填|
|selectedKey|选项框的key|-|<span style="color: red;">必填</span>|

## 事件
### Region 选框
|事件名|参数|返回值|说明|
|:-:|:-:|:-:|:-:|
|regionStart|无|无|选择开始时调用|
|regionEnd|无|无|选择结束时调用|
|selectItem|selectKey|无|使用 `Ctrl + 鼠标左键点击` 时调用|


## 方法
### Region 选框
|方法名|参数|返回值|说明|
|:-:|:-:|:-:|:-:|
|selectAll|无|无|全选|
|clearSelected|无|无|取消选择|
|getSelectItem|无|选项的selectedKey数组|获取选择数据|
