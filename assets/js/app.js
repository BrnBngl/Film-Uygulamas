  
  const search_text = document.querySelector(".search_text");
  
  search_text.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
      searchMovie();
    }
  });
  
  async function searchMovie() {
    const request = await fetch(
      `http://www.omdbapi.com/?apikey=5a96bbee&s=${search_text.value}`
    );
    const data = await request.json();
    let movies = data.Search.map(m => {
      return {
        title: m.Title,
        description: `${m.Year}/${m.Type}`,
        imdbID: m.imdbID,
        poster: m.Poster === "N/A" ? "/assets/images/default.png" : m.Poster,
        isLike: false
      

      };
    });
  
    console.log("movies", movies);
  
    prepareMovies(movies);
   
  }
  
  function prepareMovies(movies) {
    document.querySelector("#movies").innerHTML = "";
    movies.forEach(movie => {
      let movie_card = document.createElement("movie-card");
      movie_card.setAttribute("title", movie.title);
      movie_card.setAttribute("poster", movie.poster);
      movie_card.setAttribute("isLike", movie.isLike);
       movie_card.setAttribute("imdbID", movie.imdbID);
      movie_card.innerHTML = movie.description;
  
      document.querySelector("#movies").append(movie_card);
    });
  }