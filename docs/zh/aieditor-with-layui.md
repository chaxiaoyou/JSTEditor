# JSTEditor 与 Layui、JQuery 等传统框架整合



JSTEditor 与传统开发框架集成，分为 3 步：

- 1、下载 `jsteditor` 的 `js` 和 `css` ，下载地址： https://gitee.com/jsteditor-team/jsteditor/tree/main/dist 。
- 2、通过 `link` 导入 `jsteditor` 的 `css` 样式文件 。
- 3、通过 `<script type="module">` 导入 `jsteditor` 的 `js` , 并初始化 `JSTEditor` 实例 。

代码如下所示：

```html
<!doctype html>
<html lang="en">
<head>
    <title>JSTEditor Demo</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="text/css" rel="stylesheet" href="jsteditor/style.css">
    <script type="module">
        import {JSTEditor} from 'jsteditor/index.js'
        new JSTEditor({
            element: "#JSTEditor",
            placeholder: "点击输入内容...",
            content: 'JSTEditor 是一个面向 AI 的下一代富文本编辑器。',
            ai: {
                models: {
                    spark: {
                        appId: "***",
                        apiKey: "***",
                        apiSecret: "***",
                    }
                }
            },
        })
    </script>
</head>
<body>

<div id="JSTEditor" style="height: 550px;  margin: 20px"></div>

</body>
</html>
```

::: warning 注意
使用 `<script type="module">` 的导入方式，不支持 IE 浏览器。
:::
