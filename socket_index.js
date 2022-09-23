const express=require("express")
const app=express()
app.use(express.static("./public"))
app.get("/",(req,res)=>{
    res.send({
        ok:1
    })
})

const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer() // 创建http对象
const io = new Server(httpServer, {
    // 创建io对象,底层已经封装好了
    /* options */
    cors: {
        origin: '*', // 解决跨域问题
    },
})

io.on('connection', socket => {
    // io监听
    // ...
    socket.on('sendMsg', msg => {
        // 监控自定义事件,和 js中的 socket.emit('sendMsg', Function)  对应
        console.log(msg)
        io.emit('back', msg) // 创建自定义事件,和 js中的 socket.on('back', Function)  对应
    })
    io.send("连接成功")
})

app.listen(3000)

