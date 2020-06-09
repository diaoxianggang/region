<template>
  <div
    class="bq-region-item-container"
    :style="{
      width: width,
      height: height,
      boxShadow: activeShadow,
      border: border
    }"
    @click.meta="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BqRegionItem',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    boxShadow: {
      type: String,
      default: '0 0 15px 4px rgb(130, 186, 255)'
    },
    border: {
      type: String,
      default: '1px solid #666'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedKey: String
  },
  data () {
    return {
      selected: false,
      activeShadow: 'none'
    }
  },
  watch: {
    selected (val) {
      if (!this.disabled && val) {
        this.activeShadow = this.boxShadow
      } else {
        this.activeShadow = 'none'
      }
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.selected = !this.selected
        this.$parent.$emit('selectItem', this.selectedKey)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bq-region-item-container{
  width: 100%;
  height: 100%;
}
</style>
