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
const slidesData = [
  {title:"The Dark Knight", img:"images/darkknight.png"},
  {title:"Joker", img:"images/joker.png"},
  {title:"Avengers Endgame", img:"images/avengers.png"},
];

const heroSlider = document.getElementById("hero-slider");

slidesData.forEach((slide,index)=>{
  const div=document.createElement("div");
  div.className="slide";
  if(index===0) div.classList.add("active");
  div.innerHTML=`
    <img src="${slide.img}" class="slide-img">
    <div class="caption"><h1>${slide.title}</h1></div>
  `;
  heroSlider.appendChild(div);
});

let current=0;
setInterval(()=>{
  const slides=document.querySelectorAll(".slide");
  slides.forEach(s=>s.classList.remove("active"));
  slides[current].classList.add("active");
  current=(current+1)%slides.length;
},5000);
