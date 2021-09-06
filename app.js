const express=require('express');
const socket=require('socket.io');
const app=express();
const server=app.listen(3000,()=>{console.log('The server is up and running')});
app.use(express.static('public'));

//now create a socket/connection with the port
let io=socket(server);
let roomnamenew={};
//event when we are connected the socket
io.sockets.on('connection',(socket)=>{
	
	socket.on('username&roomname',(data)=>{
		console.log(data.roomname);
		//roomnamenew.append({roomname:data.roomname,socketID:socket.id});
		roomnamenew[socket.id]=data.roomname;
		socket.join(data.roomname);
		if(data.roomname===''){
			socket.broadcast.emit('mousemove',data);
		}
	})
	
			console.log("new connection: "+socket.id);
	        
			socket.on('mousemove',perform);
			let variable="test2";
			function perform(data){
				
				socket.to(roomnamenew[socket.id]).emit('mousemove',data);
				console.log(socket.id,roomnamenew,data,data.length);
			}
	
});