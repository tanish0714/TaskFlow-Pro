import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io= new Server(server,{
    cors:{
        origin:['https://chatapplication-vmo5.onrender.com'],
        methods:["GET","POST"]
    }
})
// realtime message function code
export const getRecieverSocketId=(recieverId)=>{
    return users[recieverId]
}
const users ={}
// used to listen events on server side
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)
    const userId = socket.handshake.query.userId // socket ki query me userid h frontend me use fetch kiya h
    if(userId){
        users[userId]=socket.id
        console.log("hello",users)
    }
    io.emit("getOnlineUsers",Object.keys(users)) // braodcast krega sb user ko ki online hai
// used to listen client side
socket.on("disconnect",()=>{
    console.log("a user disconnected",socket.id)
    delete users[userId]
     io.emit("getOnlineUsers",Object.keys(users))
})
})
export {app,io,server}