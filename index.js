const express=require("express")
const app=express()
app.use(express.static("./public"))
app.get("/",(req,res)=>{
    res.send({
        ok:1
    })
})
//websocket响应
//wss是我们创建的服务器，ws是客户端
const {WebSocket,WebSocketServer}=require('ws')
const wss=new WebSocketServer({port:8080});
wss.on('connection',function connection(ws) {
    ws.on('message',function connectin(data){
        console.log("收到客户端请求===》",data)
        wss.clients.forEach(function each(client){
            // //包括本人都发送
            // if(client.readyState===WebSocket.OPEN){
            //     client.send(data,{binary: false});
            // }
            // //除去本人发送
            if(client!==ws && client.readyState===WebSocket.OPEN){
                client.send(data,{binary: false});
            }
        })
    })
    ws.send('欢迎来到聊天室！');  //发送给客户端消息
})
app.listen(3000)
