<template>
  <div style="padding: 20px 10px">
    <div style="margin-bottom: 20px">
      由于当前未进行 ai 配置，因此 ai 功能暂时不可用。ai 功能体验地址：<a href="http://jsteditor.jpress.cn" target="_blank">http://jsteditor.jpress.cn</a>
    </div>
    <div ref="divRef" class="JSTEditor" style="height: 850px"/>
  </div>

</template>

<script lang="ts">
import {JSTEditor} from "jsteditor";
import "jsteditor/dist/style.css"
export default {
  mounted(){
    new JSTEditor({
      element: this.$refs.divRef as Element,
      placeholder: "点击输入内容...",
      content: 'JSTEditor 是一个面向 AI 的开源富文本编辑器。 ',
    })
  }
}
</script>

<style lang="less">
  .JSTEditor {
    *{
      box-sizing: content-box;
    }
    .aie-dropdown-item{
      h1,h2,h3,h4,h5,h6{
        padding: 0;
        margin: 0;
        border: none;
      }
    }



  }
</style>