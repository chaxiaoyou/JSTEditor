# 快速开始


## 现代开发模式

安装：

```shell
npm i jsteditor
```

使用：

```typescript
new JSTEditor({
    element: "#JSTEditor",
    placeholder: "点击输入内容...",
    content: 'JSTEditor 是一个面向 AI 的开源富文本编辑器。 ',
    ai: {
        models: {
            spark: {
                appId: "***",
                apiKey: "***",
                apiSecret: "***",
            }
        }
    }
})
```


