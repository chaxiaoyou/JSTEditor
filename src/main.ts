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
    i18n: {
        zh: {
            "undo": "撤销(可自定义国际化内容...)",
            "redo": "重做(可自定义国际化内容!)",
        }
    },
    onMentionQuery: (query) => {
        return [
            'Michael Yang', 'Jean Zhou', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder'
            , 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John'
            , 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey'
            , 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
        ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    }
})
