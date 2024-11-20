import { JSTEditor } from "./core/JSTEditor.ts";
import dayjs from 'dayjs';
// import { config } from "./spark.ts";
// @ts-ignore
window.JSTEditor = new JSTEditor({
    element: "#JSTEditor",
    placeholder: "点击输入内容1...",
    contentRetention: true,
    // editable:false,
    content: 'JSTEditor 是一个面向 AI 的下一代富文本编辑器。<p> <strong>提示：</strong> <br/>1、输入 空格 + "/" 可以快速弹出 AI 菜单 <br/> 2、输入 空格 + "@" 可以提及某人</p> ',
    // onSave:()=>{
    //     alert("保存")
    //     return true;
    // },
    ai: {
        models: {
            custom: {
                url: '/api/oa-ai/api/core/chat/chatTest',
                headers: () => {
                  return {
                    Accept: 'text/event-stream',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjM2Q2YzQwNjhiZmRmZjExYTVhYWE5NzNkZGI1NGMwZTEyZDA1ZTQxNGVlZmY0YzY0ZDkzNmZmMzQ1NmEyYzlkMzBlYzJlZWFiN2RhNGQ4In0.eyJhdWQiOiI1ZmRhYzQ0ZGE1MzRkZDEzNzU0YjljODIiLCJqdGkiOiJiYzNkNmM0MDY4YmZkZmYxMWE1YWFhOTczZGRiNTRjMGUxMmQwNWU0MTRlZWZmNGM2NGQ5MzZmZjM0NTZhMmM5ZDMwZWMyZWVhYjdkYTRkOCIsImlhdCI6MTcxNTA0NzM0MiwibmJmIjoxNzE1MDQ3MzQyLCJleHAiOjE3NDY1ODMzNDIsInN1YiI6IjYwYjlmYzQxMGE0MzUzMzBkZTE1ZTY2NiIsInNjb3BlcyI6W119.QFromxPXPWxl2bg26KnUPjNiz704XP48ySzgf0duG9QWsVD0PMDcdV_9g9MBcV0IZQSY7YYmqF42kztrPvfnsq-MCAMBAiya7qnb1iyvZ0hUgTHVfEFloEW9P8kWx3t6EJ7Yg46qhUPppR0ls-oOM0VUflDxJ4YPv3yNbhdAqvAlrM4Fr6TpBtr8rLwG_VAJq9pSP93JEZrMckpnRspuUek7cqB9fh1ZzgvWSez_VhPhl2HpnnDmWaWImXvf9k4RWA06G4G6bx_3tarFSQMVMuGAkkE05qaWHId5PWtwSCa3ZUeYMwbGCqlFpQOglaNSFl5nRbrMJm3PlhcNClh4ANGfgcT7CUOd3892NKWMUt4gkJOsSQyoMHEIhlydNc2CJV_Maf7b85Y-i30Y4gTrpTaupfkFoy9Ia51wja7Zb5PxUQz5Zc2wWulnta7xXYIp5vyoJD_DWbdJtB9OCZeJXTeJertoipf_96GZYbsRfAbkJ6y5Uly7IF9Yst5w_g3i8T9dmHI6u-rH6sgJU1cgPi3mVaErYgqTp_uIetTSCISNByrJmobDNm96to_p2puRHPzPtZbD-pdXwQtDdZ9bhr31AcxRRkLaP8jIoUAmpMd34vb55Vikmua7Z1_sGxgo1Hpo8GiY--wwalN34wiMp9xLvyi4umBs5CB4Z0cDQdQ`,
                  };
                },
                messageWrapper: (message: string) => {
                  return JSON.stringify({
                    prompt: message,
                    history: [],
                    detail: true,
                    stream: true,
                    m: 'xhs',
                    variables: {
                      cTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    },
                    appId: '661deeeef44f54e8cc5dbce8',
                    appName: '小红书文案',
                  });
                },
                messageParser: (message: string) => {
                  console.info('onMessage:', message);
                  return {
                    role: 'assistant',
                    content: message,
                    // index: number,
                    // //0 代表首个文本结果；1 代表中间文本结果；2 代表最后一个文本结果。
                    status: 2,
                  };
                },
                // protocol: "sse" | "websocket"
              },
        },
        // bubblePanelEnable:false,
        bubblePanelModel: "custom",
        onTokenConsume: (modelName, _modelConfig, count) => {
            console.log(modelName, " token count:" + count)
        }

    },
    onChange: (aiEditor) => {
        // 监听到用编辑器内容发生变化了，控制台打印编辑器的 html 内容...
        const text = aiEditor.getJson();
        // const xx = aiEditor.getOptions();
        console.log(text)
      },
    i18n: {
        zh: {
            "undo": "撤销(可自定义国际化内容...)",
            "redo": "重做(可自定义国际化内容!)",
        }
    },
    onSelectMention: (item) => {
        console.log(item);
    },
    onMentionQuery: (query) => {
       return [
        {
            "nickname": "艾克里里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5aa5fb47e8ac2b289a75c954",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo319labfa8mu004a39gstkfiakc1er5oo?imageView2/2/w/80/format/jpg",
            "user_nickname": "艾克里里",
            "value": "艾克里里",
            "name": "艾克里里",
            "_type": "user",
            "id": "5aa5fb47e8ac2b289a75c954"
        },
        {
            "nickname": "马布里Marbury",
            "index": "1",
            "denotation_char": "@",
            "user_id": "617a4c550000000002026915",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3189crapp0s005obq9hagkq8lq0uf1no?imageView2/2/w/80/format/jpg",
            "user_nickname": "马布里Marbury",
            "value": "马布里Marbury",
            "name": "马布里Marbury",
            "_type": "user",
            "id": "617a4c550000000002026915"
        },
        {
            "nickname": "裡",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5fa6acb50000000001002e25",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3171pk83t466g5nt6liqg8bh5sup2d48?imageView2/2/w/80/format/jpg",
            "user_nickname": "裡",
            "value": "裡",
            "name": "裡",
            "_type": "user",
            "id": "5fa6acb50000000001002e25"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "635543a2000000001901d352",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/6484936cb4070c4d450d3de5.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "635543a2000000001901d352"
        },
        {
            "nickname": "摄影师苏里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "63a2534b0000000026004ed7",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3134vnu78m6005ot2ad5pgjmn7e6gdi8?imageView2/2/w/80/format/jpg",
            "user_nickname": "摄影师苏里",
            "value": "摄影师苏里",
            "name": "摄影师苏里",
            "_type": "user",
            "id": "63a2534b0000000026004ed7"
        },
        {
            "nickname": "穆里尼奥 Jose Mourinho",
            "index": "1",
            "denotation_char": "@",
            "user_id": "6369e256000000001f01c2ec",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/63772886dfbed1c0beb0dd3b.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "穆里尼奥 Jose Mourinho",
            "value": "穆里尼奥 Jose Mourinho",
            "name": "穆里尼奥 Jose Mourinho",
            "_type": "user",
            "id": "6369e256000000001f01c2ec"
        },
        {
            "nickname": "裡",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5ea3d0710000000001000861",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3105mh7i6lq005nl3q1og82315000otg?imageView2/2/w/80/format/jpg",
            "user_nickname": "裡",
            "value": "裡",
            "name": "裡",
            "_type": "user",
            "id": "5ea3d0710000000001000861"
        },
        {
            "nickname": "裡",
            "index": "1",
            "denotation_char": "@",
            "user_id": "622200c2000000002102b16a",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo317tt9kidgq005oh20318dcba6th1hqo?imageView2/2/w/80/format/jpg",
            "user_nickname": "裡",
            "value": "裡",
            "name": "裡",
            "_type": "user",
            "id": "622200c2000000002102b16a"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5c92e3b80000000010039897",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/62214b9469f08803229aa6d8.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "5c92e3b80000000010039897"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "6229a67a000000001000f19a",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3181vo46744005oh9kpt41scq0bvmffo?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "6229a67a000000001000f19a"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "6402ed53000000001002622d",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/6402ed53000000001002622d.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "6402ed53000000001002622d"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "618fc38e0000000010006a03",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo312bef7jv5m8g5ocfoe740qg351q4vuo?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "618fc38e0000000010006a03"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5f23ad060000000001006535",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo311vns5ucj0005np3lk308p9lqhpamlo?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "5f23ad060000000001006535"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "62a8aa58000000001b0278a6",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1000g2jo2pkbfpg0k600g5ol8l9c6su56qci3ej0?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "62a8aa58000000001b0278a6"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "671b3f19000000000b0303da",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/645b800677c97ef1a2abc7e0.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "671b3f19000000000b0303da"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5b27d98711be105c5ab58d89",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/6257e0dd2912c7e023b15b84.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "5b27d98711be105c5ab58d89"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "60af4607000000000101f111",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/635bcf2b2306723c664724e8.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "60af4607000000000101f111"
        },
        {
            "nickname": "李里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "5988a08250c4b438e2221e0d",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/6319d5c7ff1cb37a68d57902.jpg?imageView2/2/w/80/format/jpg",
            "user_nickname": "李里",
            "value": "李里",
            "name": "李里",
            "_type": "user",
            "id": "5988a08250c4b438e2221e0d"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "609b7b940000000001007350",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo314klmv4jmg005o4rfea08sqg0q5j428?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "609b7b940000000001007350"
        },
        {
            "nickname": "里",
            "index": "1",
            "denotation_char": "@",
            "user_id": "61f653440000000010009622",
            "image": "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo3183cg9f2k6005ofmad2415h2jjjoob8?imageView2/2/w/80/format/jpg",
            "user_nickname": "里",
            "value": "里",
            "name": "里",
            "_type": "user",
            "id": "61f653440000000010009622"
        }
    ];
        return [
            'Michael Yang', 'Jean Zhou', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder'
            , 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John'
            , 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey'
            , 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
        ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    }
})
