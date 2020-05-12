<template>
  <!-- <div
    ref="bqregion"
    class="bq-region-container"
    @mousedown="handleMousedown"
    @mousemove="handleMousemove"
    @mouseup="handleMouseup"
  > -->
  <div
    ref="bqregion"
    class="bq-region-container"
    @mousedown="handleMousedown"
  >
    <div
      ref="regionbox"
      class="bq-region-box"
      v-if="region.show"
      :style="{
        width: region.width,
        height: region.height,
        top: region.top,
        left: region.left,
        border: border,
        backgroundColor: backgroundColor
      }"
    ></div>
    <slot></slot>
    <i
      class="bq-i-blank"
      v-for="i in blankEl"
      :key="i.id"
      :style="{width: i.width, height: 0}"
    ></i>
  </div>
</template>

<script>
import { UUID } from '../utils'
export default {
  name: 'bqRegion',
  props: {
    border: {
      type: String,
      default: '1px dotted #368cd4'
    },
    backgroundColor: {
      type: String,
      default: 'rgba(51, 168, 230, 0.35)'
    }
  },
  data () {
    return {
      selected: [],
      elList: null,
      blankEl: [],
      isMove: false,
      region: {
        show: false,
        width: '0px',
        height: '0px',
        top: '0px',
        left: '0px',
        startX: 0,
        startY: 0
      }
    }
  },
  methods: {
    handleMousedown (e) {
      if (e.button === 2 || e.currentTarget !== e.target) {
        return
      }
      this.isMove = true
      this.$emit('regionStart')
      const evt = window.event || arguments[0]
      const _x = (evt.x || evt.clientX)
      const _y = (evt.y || evt.clientY)
      const parentPosition = this.$refs.bqregion.getBoundingClientRect()
      this.region.startY = (_y - parentPosition.top + this.$refs.bqregion.scrollTop)
      this.region.startX = (_x - parentPosition.left)
      this.region.show = true
    },
    handleMousemove (evt) {
      if (this.region.show && this.isMove) {
        const parentPosition = this.$refs.bqregion.getBoundingClientRect()
        const _x = (evt.x || evt.offsetX) - parentPosition.left
        const _y = (evt.y || evt.offsetY) - parentPosition.top + this.$refs.bqregion.scrollTop
        this.region.left = Math.min(_x, this.region.startX) + 'px'
        this.region.top = Math.min(_y, this.region.startY) + 'px'
        this.region.width = Math.abs(_x - this.region.startX) + 'px'
        this.region.height = Math.abs(_y - this.region.startY) + 'px'

        const region = this.$refs.regionbox
        const _l = region.offsetLeft
        const _t = region.offsetTop
        const _w = region.offsetWidth
        const _h = region.offsetHeight

        this.elList = this.$slots.default.map(i => {
          return i.elm
        })
        this.elList.forEach((i, index) => {
          const sl = i.offsetWidth + i.offsetLeft
          const st = i.offsetHeight + i.offsetTop
          if (sl > _l && st > _t && i.offsetLeft < _l + _w && i.offsetTop < _t + _h) {
            if (!this.$slots.default[index].componentInstance.selected) {
              (this.$slots.default[index].componentInstance.disabled) || (this.$slots.default[index].componentInstance.selected = true)
            }
          } else {
            this.$slots.default[index].componentInstance.selected = false
          }
        })
      }
    },
    handleMouseup () {
      if (this.isMove) {
        this.isMove = false
        this.$emit('regionEnd')
        this.region.show = false
        this.region.top = '0px'
        this.region.left = '0px'
        this.region.width = '0px'
        this.region.height = '0px'
      }
    },
    getSelectItem () {
      this.selected = []
      const arr = this.$slots.default
      arr.forEach((i, index) => {
        const selected = i.componentInstance.selected
        if (selected) {
          this.selected.push(i.componentInstance.selectedKey)
        }
      })
      return this.selected
    },
    selectAll () {
      const arr = this.$slots.default
      arr.forEach((i, index) => {
        i.componentInstance.selected = true
      })
    },
    clearSelected () {
      const arr = this.$slots.default
      arr.forEach((i, index) => {
        i.componentInstance.selected = false
      })
    }
  },
  mounted () {
    const itemWidth = parseInt(this.$slots.default[0].elm.offsetWidth)
    const blankNum = Math.floor(this.$el.offsetWidth / itemWidth) + 1
    for (let i = 0; i < blankNum; i++) {
      this.blankEl.push({
        id: UUID(),
        width: itemWidth + 'px'
      })
    }
    document.addEventListener('mouseup', () => {
      this.handleMouseup()
    })
    let t = null
    this.$refs.bqregion.addEventListener('mousemove', (e) => {
      if (t === null) {
        t = setTimeout(() => {
          this.handleMousemove(e)
          t = null
        }, 40)
      }
    }, false)
  }
}
</script>

<style lang="scss" scoped>
.bq-region-container{
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  user-select: none !important;
  overflow: auto;
  .bq-region-box {
    position: absolute;
    z-index: 1;
  }
  .bq-region-item-container, .bq-i-blank {
    margin: 10px;
  }
}
</style>
