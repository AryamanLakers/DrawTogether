const canvas=document.getElementsByClassName("canvas_class")[0];
const ctx=canvas.getContext('2d');
const username=window.location.href.split('?')[1].split('=')[1].split('&')[0]
const roomname=window.location.href.split('?')[1].split('=')[2]



console.log(username,roomname);
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

//connecting our client side to server
let socket;
socket=io.connect('http://localhost:3000');
socket.emit('username&roomname',{username:username,roomname:roomname});
//so when we receive content from server we show it on the screen
//btw this will shown on all the clients except the one on which 
//we are working
socket.on('mousemove',drawing);

function drawing(data){
 	
 	if(data.isPaint){
 		ctx.beginPath();
 	}
 	ctx.lineWidth=5;
	ctx.lineCap="round";
	ctx.strokeStyle="red";
	ctx.lineTo(data.x,data.y);
	ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(data.x,data.y);
     
}
 
function mouseDragged(mouseX,mouseY,count){
 	//we are passing the data to server via socket connection
 	let data={
 		x:mouseX,
 		y:mouseY,
 		isPaint:count
 	}
 	socket.emit('mousemove',data);
}

//Here we are working on the client side and this function is called
//everytime mouse is moved on the canvas
function temp(event,count){
		ctx.lineWidth=5;
		ctx.lineCap="round";
		ctx.strokeStyle="white";
		ctx.lineTo(event.clientX,event.clientY);
		ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(event.clientX,event.clientY);
      mouseDragged(event.clientX,event.clientY,count);
}

//event listeners for mousedown and mousemove, so that we know the
//the x and y coordinates of our movement
//which pass to server which broadcast to other clients
canvas.addEventListener("mousedown",(e)=>{
	
	canvas.addEventListener("mousemove",temp.bind(event,0),{once:true});
	canvas.addEventListener("mousemove",temp);
	
	canvas.addEventListener("mouseup",()=>{
		canvas.removeEventListener("mousemove",temp);
		ctx.beginPath();
		
	})
	
});


// canvas.addEventListener("mousedown",(e)=>{
	
// 	const promise=new Promise((resolve,reject)=>{
// 		canvas.addEventListener("mousemove",temp);
// 		return painting==true?resolve():reject("there is some error");
// 	}).then((response)=>{

// 		canvas.addEventListener("mouseup",()=>{
// 		canvas.removeEventListener("mousemove",temp);
// 		ctx.beginPath();
// 		painting=false;
// 	});

// 	}).catch((error)=>{console.error(error)});
// });

canvas.addEventListener('resize',()=>{
	canvas.height=window.innerHeight;
	canvas.width=window.width;
});

//the biggest challenge that I faced:::::

//1. it was related to understanding canvas,so what actually happens
//when the mouseup event happens I wanted to move the start point to \
//the coordinates of the next pressdown event.

//2. i managed it for the client side by adding beginPath() at the pressup event
// but for all the other clients to whom we are transmitting the data
//i can't just simply add beginpath(), this would create new path every time the cursor moves
//which means nothing will be outputed. Therefore, I passed a parameter of count which will carry
// the 0 and we also made a dummy event listner which would only execute once when cursor is moved first time 
//after pressdown so if(count===0) i begin a new path which will prevented me from creating breakable lines


//this is the code for random code generator


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}