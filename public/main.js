// const username=window.location.href.split('?')[1].split('=')[1].split('&')[0]
// const roomname=window.location.href.split('?')[1].split('=')[2]


// socket=io.connect('http://localhost:3000');
// socket.emit('username&roomname',{username:username,roomname:roomname});
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const generatebutton=document.getElementById("random");
const codebutton=document.getElementById("roomname");
console.log(generatebutton);
generatebutton.addEventListener('click',()=>{
	
	let randomString=generateString(8);
	console.log(randomString);
	codebutton.setAttribute('value', randomString)
});
