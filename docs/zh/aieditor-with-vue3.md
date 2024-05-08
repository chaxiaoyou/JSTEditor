# JSTEditor 与 Vue3 整合


在 Vue 中，我们通过 `ref` 属性定义 `div` 的 `$refs` 引用，然后再通过 `new JSTEditor` 进行实例化，示例代码如下：

```html
<template>
    <div>
        <h1>JSTEditor，一个面向 AI 的富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 600px"/>
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
```


或者使用 `vue` 的 `setup` 语法：

```vue
<template>
  <div>
    <h1>JSTEditor，一个面向 AI 的富文本编辑器</h1>
  </div>
  <div ref="divRef" style="height: 600px"/>
</template>

<script setup lang="ts">
import {JSTEditor} from "jsteditor";
import "jsteditor/dist/style.css"
import {onMounted, onUnmounted, ref} from "vue";

const divRef = ref();
let JSTEditor: JSTEditor | null = null;

onMounted(() => {
  JSTEditor = new JSTEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: 'JSTEditor 是一个面向 AI 的开源富文本编辑器。 ',
  })
})

onUnmounted(() => {
  JSTEditor && JSTEditor.destroy();
})
</script>
```

更多 vue 集成示例请参考：https://gitee.com/jsteditor-team/jsteditor/tree/main/demos/vue-ts 