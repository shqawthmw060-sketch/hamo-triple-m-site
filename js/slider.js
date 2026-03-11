// بيانات سلايدر تجريبية، يمكن ربطها بTMDb API
const slidesData = [
  {title:"Avengers: Endgame", img:"https://image.tmdb.org/t/p/w1280/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
  {title:"Joker", img:"https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"},
  {title:"Inception", img:"https://image.tmdb.org/t/p/w1280/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"},
  {title:"The Dark Knight", img:"https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
];

const heroSlider = document.getElementById("hero-slider");

slidesData.forEach((slide,index)=>{
  const div = document.createElement("div");
  div.className = "slide";
  if(index===0) div.classList.add("active");
  div.innerHTML = `
    <img src="${slide.img}" style="width:100%;height:100%;object-fit:cover;">
    <div class="caption"><h1>${slide.title}</h1></div>
  `;
  heroSlider.appendChild(div);
});

// الحركة المتقدمة + تأثير التحريك الجزئي
let current=0;
setInterval(()=>{
  const slides=document.querySelectorAll(".slide");
  slides.forEach(s=>s.classList.remove("active"));
  slides[current].classList.add("active");
  current=(current+1)%slides.length;
},5000);

// CSS تأثيرات إضافية: slide-in, scale, opacity
