const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMG =
  "https://via.placeholder.com/500x750?text=No+Image";

const genreSelect = document.getElementById("genre");
const countInput = document.getElementById("count");
const searchBtn = document.getElementById("searchBtn");
const sortToggle = document.getElementById("sortToggle");
const movieGrid = document.getElementById("movieGrid");
const status = document.getElementById("status");

let movies = [];
let sortedByRating = false;

searchBtn.addEventListener("click", fetchMovies);
sortToggle.addEventListener("click", toggleSort);

async function fetchMovies() {
  const genreId = genreSelect.value;
  const count = Math.min(Math.max(parseInt(countInput.value, 10) || 1, 1), 20);

  if (!genreId) {
    showStatus("Please select a genre.", true);
    return;
  }

  showLoading();

  try {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      showStatus("No movies found for this genre.", true);
      return;
    }

    movies = data.results.slice(0, count);
    sortedByRating = false;
    sortToggle.textContent = "Off";
    sortToggle.setAttribute("aria-pressed", "false");

    renderMovies(movies);
    hideStatus();
  } catch (err) {
    showStatus(`Failed to fetch movies. ${err.message}`, true);
  }
}

function toggleSort() {
  if (movies.length === 0) return;

  sortedByRating = !sortedByRating;
  sortToggle.textContent = sortedByRating ? "On" : "Off";
  sortToggle.setAttribute("aria-pressed", String(sortedByRating));

  const display = sortedByRating
    ? [...movies].sort((a, b) => b.vote_average - a.vote_average)
    : [...movies];

  renderMovies(display);
}

function renderMovies(list) {
  movieGrid.innerHTML = list
    .map((m) => {
      const poster = m.poster_path
        ? `${IMG_BASE}${m.poster_path}`
        : PLACEHOLDER_IMG;
      const rating = m.vote_average != null ? m.vote_average.toFixed(1) : "N/A";
      const overview = m.overview || "No overview available.";

      return `
        <article class="movie-card">
          <img src="${poster}" alt="${escapeHtml(m.title)}" loading="lazy" />
          <div class="info">
            <p class="title" title="${escapeHtml(m.title)}">${escapeHtml(m.title)}</p>
            <p class="rating">⭐ ${rating}</p>
            <p class="overview">${escapeHtml(overview)}</p>
          </div>
        </article>`;
    })
    .join("");
}

function showLoading() {
  status.hidden = false;
  status.className = "status";
  status.innerHTML = '<span class="spinner"></span> Loading movies…';
  movieGrid.innerHTML = "";
}

function showStatus(message, isError) {
  status.hidden = false;
  status.className = isError ? "status error" : "status";
  status.textContent = message;
  movieGrid.innerHTML = "";
}

function hideStatus() {
  status.hidden = true;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
