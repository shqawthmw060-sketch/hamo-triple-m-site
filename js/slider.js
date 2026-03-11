const slidesData = [
  {title:"Avengers: Endgame", img:"https://image.tmdb.org/t/p/w1280/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
  {title:"Joker", img:"https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"},
  {title:"Inception", img:"https://image.tmdb.org/t/p/w1280/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"}
];

const heroSlider = document.getElementById("hero-slider");

slidesData.forEach((slide,index)=>{
  const div = document.createElement("div");
  div.className = "slide";
  if(index===0) div.classList.add("active");
  div.innerHTML = `<img src="${slide.img}" style="width:100%;height:100%;object-fit:cover;">
                   <div class="caption"><h1>${slide.title}</h1></div>`;
  heroSlider.appendChild(div);
});

let current = 0;
setInterval(()=>{
  const slides = document.querySelectorAll(".slide");
  slides[current].classList.remove("active");
  current = (current+1)%slides.length;
  slides[current].classList.add("active");
},5000);
