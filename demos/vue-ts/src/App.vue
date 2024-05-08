<template>
  <div>
    <h1>JSTEditor，一个面向 AI 的富文本编辑器</h1>
  </div>
  <div ref="divRef" style="height: 600px"/>
</template>

<!--<script setup lang="ts">-->
<!--import {JSTEditor} from "jsteditor";-->
<!--import "jsteditor/dist/style.css"-->
<!--import {onMounted, onUnmounted, ref} from "vue";-->

<!--const divRef = ref();-->
<!--let JSTEditor: JSTEditor | null = null;-->

<!--onMounted(() => {-->
<!--  JSTEditor = new JSTEditor({-->
<!--    element: divRef.value as Element,-->
<!--    placeholder: "点击输入内容...",-->
<!--    content: 'JSTEditor 是一个面向 AI 的开源富文本编辑器。 ',-->
<!--  })-->
<!--})-->

<!--onUnmounted(() => {-->
<!--  JSTEditor && JSTEditor.destroy();-->
<!--})-->
<!--</script>-->

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