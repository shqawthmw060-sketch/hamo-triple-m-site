async function loadMovies(){

let res = await fetch(
"https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API"
)

let data = await res.json()

let container=document.getElementById("trending")

data.results.forEach(movie=>{

let card=document.createElement("div")

card.className="movie-card"

card.innerHTML=`
<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
<p>${movie.title}</p>
`

container.appendChild(card)

})

}

loadMovies()
async function loadMoviesByCategory(containerId, category){
  const container=document.getElementById(containerId);
  const apiKey="YOUR_API_KEY";
  let url=`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  
  switch(category){
    case "latest": url=`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`; break;
    case "series": url=`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`; break;
    case "kids": url=`https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=${apiKey}`; break;
    case "doc": url=`https://api.themoviedb.org/3/discover/movie?with_genres=99&api_key=${apiKey}`; break;
  }

  const res=await fetch(url);
  const data=await res.json();
  data.results.forEach(movie=>{
    const card=document.createElement("div");
    card.className="movie-card";
    card.innerHTML=`<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <p>${movie.title}</p>`;
    container.appendChild(card);
  });
}

// مثال التحميل لكل الأقسام
loadMoviesByCategory("trending-row","trending");
loadMoviesByCategory("latest-row","latest");
loadMoviesByCategory("series-row","series");
loadMoviesByCategory("kids-row","kids");
loadMoviesByCategory("doc-row","doc");
