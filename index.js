const movieSearchBox = document.getElementById("movie__search--box");
const cardWrapper = document.querySelector(".user-card__container");
const displayData = document.querySelector(".container");

//loading movies from API
async function loadMovies(searchTerm) {
  displayData.classList.remove("display__none");
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=6ffb4188`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data);
  if (data.Response == "True") {
    cardWrapper.classList += " card__loading";
    setTimeout(() => {
      mapDetails(data.Search);
    }, 1000);
  }
}

//mapping array
function mapDetails(movie) {
  const userListEl = document.querySelector(".user-list");
  cardWrapper.classList.remove("card__loading");
  userListEl.innerHTML = movie
    .map(
      (movies) =>
        `
        <div class="user-card">
        <div class="user-card__container">
        <img class ="user-card__pic"src="${movies.Poster}" alt="movie_poster">
      <h3>Title: ${movies.Title}</h3>
        <p><b>Year:</b> ${movies.Year}</p>
    </div>       
    </div>
        `
    )
    .join("");
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  displayData.classList += " display__none";
  setTimeout(() => {
    loadMovies(searchTerm);
  }, 300);
}
