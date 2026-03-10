async function loadChannels(){

let res = await fetch("channels/channels.m3u")

let text = await res.text()

let lines = text.split("\n")

let channels = document.getElementById("channels")

for(let i=0;i<lines.length;i++){

if(lines[i].includes("#EXTINF")){

let name = lines[i].split(",")[1]
let url = lines[i+1]

let btn = document.createElement("button")

btn.innerText = name

btn.onclick = ()=>{

document.getElementById("player").src = url

}

channels.appendChild(btn)

}

}

}

loadChannels()
