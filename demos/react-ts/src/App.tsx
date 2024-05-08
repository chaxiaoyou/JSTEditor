import {useEffect, useRef} from 'react'
import {JSTEditor} from "jsteditor";
import "jsteditor/dist/style.css"

function App() {

    //定义 ref
    const divRef = useRef(null);

    //初始化 JSTEditor
    useEffect(() => {
        if (divRef.current) {
            const JSTEditor = new JSTEditor({
                element: divRef.current,
                placeholder: "点击输入内容...",
                content: 'JSTEditor 是一个面向 AI 的开源富文本编辑器。 ',
            })
            return ()=>{
                JSTEditor.destroy();
            }
        }
    }, [])

    return (
        <>
            <div>
                <h1>JSTEditor，一个面向 AI 的富文本编辑器</h1>
            </div>
            <div ref={divRef} style={{height: "600px"}} />
        </>
    )
}

export default App
