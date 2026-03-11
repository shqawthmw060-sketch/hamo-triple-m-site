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
