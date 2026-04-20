const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YTS_BASE_URL = "https://yts.mx/api/v2/list_movies.json";
const FALLBACK_POSTER =
  "https://via.placeholder.com/500x750/1b2232/f5f7fb?text=No+Poster";

const sourceSelect = document.getElementById("sourceSelect");
const apiKeyInput = document.getElementById("apiKey");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const genreSelect = document.getElementById("genreSelect");
const movieCountInput = document.getElementById("movieCount");
const sortToggle = document.getElementById("sortToggle");
const fetchBtn = document.getElementById("fetchBtn");
const statusMessage = document.getElementById("statusMessage");
const movieGrid = document.getElementById("movieGrid");
const movieCardTemplate = document.getElementById("movieCardTemplate");
const keyGroup = document.querySelector(".key-group");

let currentMovies = [];

const readStoredApiKey = () => localStorage.getItem("tmdbApiKey") || "";

const YTS_GENRE_MAP = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Music",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Sci-Fi",
  "53": "Thriller"
};

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`.trim();
}

function getSelectedCount() {
  const parsed = Number(movieCountInput.value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }
  if (parsed > 20) {
    return 20;
  }
  return parsed;
}

function getActiveApiKey() {
  return apiKeyInput.value.trim() || readStoredApiKey();
}

function clearMovies() {
  movieGrid.replaceChildren();
}

function normalizeTmdbMovies(movies) {
  return movies.map((movie) => ({
    title: movie.title,
    vote_average: movie.vote_average,
    overview: movie.overview,
    poster_url: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null
  }));
}

function normalizeYtsMovies(movies) {
  return movies.map((movie) => ({
    title: movie.title,
    vote_average: movie.rating,
    overview: movie.summary,
    poster_url: movie.large_cover_image || movie.medium_cover_image || null
  }));
}

function createMovieCard(movie, index) {
  const fragment = movieCardTemplate.content.cloneNode(true);
  const poster = fragment.querySelector(".poster");
  const title = fragment.querySelector(".title");
  const rating = fragment.querySelector(".rating");
  const overview = fragment.querySelector(".overview");
  const card = fragment.querySelector(".movie-card");

  poster.src = movie.poster_url || FALLBACK_POSTER;
  poster.alt = `${movie.title} poster`;

  title.textContent = movie.title;
  rating.textContent = Number(movie.vote_average).toFixed(1);
  overview.textContent = movie.overview || "No overview available for this movie.";

  card.style.animationDelay = `${index * 55}ms`;
  return fragment;
}

function renderMovies(movies) {
  clearMovies();

  if (movies.length === 0) {
    setStatus("No movies found for this selection.", "error");
    return;
  }

  const fragment = document.createDocumentFragment();
  movies.forEach((movie, index) => {
    fragment.appendChild(createMovieCard(movie, index));
  });
  movieGrid.appendChild(fragment);
}

function sortMoviesByRatingIfNeeded(movies) {
  if (!sortToggle.checked) {
    return [...movies];
  }
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
}

async function fetchMovies() {
  const source = sourceSelect.value;
  const genre = genreSelect.value;
  const count = getSelectedCount();

  setStatus("Loading movies...");
  fetchBtn.disabled = true;

  try {
    let normalized = [];

    if (source === "tmdb") {
      const apiKey = getActiveApiKey();
      if (!apiKey) {
        throw new Error("Add your TMDB API key or switch to YTS (no key).");
      }

      const params = new URLSearchParams({
        api_key: apiKey,
        with_genres: genre,
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        sort_by: "popularity.desc",
        page: "1"
      });

      const response = await fetch(`${TMDB_BASE_URL}/discover/movie?${params.toString()}`);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("TMDB rejected the API key. Please verify your key.");
        }
        throw new Error(`Failed to load movies (status ${response.status}).`);
      }

      const payload = await response.json();
      normalized = Array.isArray(payload.results)
        ? normalizeTmdbMovies(payload.results)
        : [];
    } else {
      const ytsGenre = YTS_GENRE_MAP[genre] || "All";
      const params = new URLSearchParams({
        genre: ytsGenre,
        sort_by: "download_count",
        order_by: "desc",
        limit: String(Math.max(count, 12)),
        page: "1"
      });

      const response = await fetch(`${YTS_BASE_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to load YTS movies (status ${response.status}).`);
      }

      const payload = await response.json();
      const ytsMovies = payload?.data?.movies;
      normalized = Array.isArray(ytsMovies)
        ? normalizeYtsMovies(ytsMovies)
        : [];
    }

    currentMovies = normalized.slice(0, count);

    const renderedMovies = sortMoviesByRatingIfNeeded(currentMovies);
    renderMovies(renderedMovies);

    setStatus(`Showing ${renderedMovies.length} movies.`, "success");
  } catch (error) {
    setStatus(error.message || "Something went wrong while fetching movies.", "error");
    clearMovies();
  } finally {
    fetchBtn.disabled = false;
  }
}

function saveApiKey() {
  const value = apiKeyInput.value.trim();

  if (!value) {
    localStorage.removeItem("tmdbApiKey");
    setStatus("Saved key removed. Add a key to fetch movies.");
    return;
  }

  localStorage.setItem("tmdbApiKey", value);
  setStatus("API key saved in local storage.", "success");
}

function rerenderFromCurrentState() {
  if (currentMovies.length === 0) {
    return;
  }

  const count = getSelectedCount();
  const limited = currentMovies.slice(0, count);
  const renderedMovies = sortMoviesByRatingIfNeeded(limited);
  renderMovies(renderedMovies);
  setStatus(`Showing ${renderedMovies.length} movies.`, "success");
}

function updateKeyVisibility() {
  const needsKey = sourceSelect.value === "tmdb";
  keyGroup.classList.toggle("hidden", !needsKey);
}

saveKeyBtn.addEventListener("click", saveApiKey);
fetchBtn.addEventListener("click", fetchMovies);
sortToggle.addEventListener("change", rerenderFromCurrentState);
movieCountInput.addEventListener("change", rerenderFromCurrentState);
sourceSelect.addEventListener("change", () => {
  updateKeyVisibility();
  setStatus(
    sourceSelect.value === "tmdb"
      ? "TMDB selected. Add API key if missing."
      : "YTS selected. No API key needed."
  );
});

document.addEventListener("DOMContentLoaded", () => {
  updateKeyVisibility();
  const storedKey = readStoredApiKey();
  if (storedKey) {
    apiKeyInput.value = storedKey;
    if (sourceSelect.value === "tmdb") {
      setStatus("API key loaded from local storage.");
    }
  } else if (sourceSelect.value === "yts") {
    setStatus("YTS selected. No API key needed.");
  }
});
