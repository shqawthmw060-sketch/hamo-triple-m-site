async function loadChannels(){

let res = await fetch("data/channels.m3u")

let text = await res.text()

let lines = text.split("\n")

for(let i=0;i<lines.length;i++){

if(lines[i].includes("#EXTINF")){

let name = lines[i].split(",")[1]

let url = lines[i+1]

createChannel(name,url)

}

}

}

function createChannel(name,url){

let btn=document.createElement("button")

btn.innerText=name

btn.onclick=()=>{

document.getElementById("player").src=url

}

document.body.appendChild(btn)

}

loadChannels()
