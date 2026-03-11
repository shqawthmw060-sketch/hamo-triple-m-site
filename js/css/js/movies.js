async function loadMovies(){
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API_KEY");
  const data = await res.json();
  const container = document.getElementById("trending");
  data.results.forEach(movie=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" style="width:100%;height:100%;object-fit:cover;">
                    <p style="position:absolute;bottom:5px;color:white;text-shadow:1px 1px 2px black;">${movie.title}</p>`;
    container.appendChild(card);
  });
}

loadMovies();
