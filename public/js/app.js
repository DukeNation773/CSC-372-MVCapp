document.addEventListener("DOMContentLoaded", () => {
  const randomJokeText = document.getElementById("random-joke-text");
  const jokeList = document.getElementById("jokes-list");
  const funnyJokeBtn = document.getElementById("funnyJokeBtn");
  const lameJokeBtn = document.getElementById("lameJokeBtn");
  const categorySelect = document.getElementById("category-select");
  const jokeForm = document.getElementById("joke-form");

  fetchRandomJoke();

  funnyJokeBtn.addEventListener("click", () =>
    fetchJokesByCategory("funnyJoke")
  );

  lameJokeBtn.addEventListener("click", () => fetchJokesByCategory("lameJoke"));
  jokeForm.addEventListener("submit", addNewJoke);

  function fetchRandomJoke() {
    fetch("/jokebook/joke/random")
      .then((response) => response.json())
      .then((data) => {
        if (data.joke) {
          randomJokeText.textContent = `${data.joke.setup} - ${data.joke.delivery}`;
        } else {
          randomJokeText.textContent = "No joke found";
        }
      })
      .catch((error) => {
        console.error("Error fetching random joke:", error);
        randomJokeText.textContent = "Failed to load random joke";
      });
  }

  function fetchJokesByCategory(category) {
    fetch(`/jokebook/joke/${category}`)
      .then((response) => response.json())
      .then((data) => {
        jokeList.innerHTML = "";
        data.jokes.forEach((joke) => {
          const div = document.createElement("div");
          div.classList.add("joke-item");
          div.innerHTML = `<h3>${joke.setup}</h3><p>${joke.delivery}</p>`;
          jokeList.appendChild(div);
        });
      });
  }

  function addNewJoke(event) {
    event.preventDefault();

    const category = categorySelect.value;
    const setup = document.getElementById("setup").value;
    const delivery = document.getElementById("delivery").value;

    fetch("/jokebook/joke/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, setup, delivery }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchJokesByCategory(category);
      });
  }

});
