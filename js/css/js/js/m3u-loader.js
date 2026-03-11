async function loadChannels(){
  const res = await fetch("data/channels.m3u");
  const text = await res.text();
  const lines = text.split("\n");
  const container = document.getElementById("channels");
  
  for(let i=0;i<lines.length;i++){
    if(lines[i].includes("#EXTINF")){
      const name = lines[i].split(",")[1];
      const url = lines[i+1];
      const btn = document.createElement("button");
      btn.innerText=name;
      btn.onclick=()=> document.getElementById("player").src=url;
      container.appendChild(btn);
    }
  }
}

loadChannels();
