import {
  getGamesByMetacritic,
  getGamesByName,
  getGamesByPlatforms,
  getGameById,
  getGamesByDevelopers,
  getGamesByDate,
  getGamesByMetacriticScore,
} from "./getGames.js";

function addContainer(array, title) {
  const numberOfElements = array.length;
  const containerTitle = document.createElement("h2");
  containerTitle.textContent = title;
  const container = document.createElement("div");

  for (let i = 0; i < numberOfElements; i++) {
    const name = array[i].name;
    const released = array[i].released;
    const imageURL = array[i].background_image;
    const metacritic = array[i].metacritic;

    const card = document.createElement("div");
    card.classList.add("game-card");
    container.appendChild(card);
    if (imageURL != null) {
      card.innerHTML = `
        <img src="${imageURL}" alt="${name}">`;
    }
    card.innerHTML += `
    <h4>Name: ${name}</h4>
                    <p>Release Date: ${released}</p>
                    <p>Metacritic Rating: ${metacritic}</p>
                `;
  }
  document.body.appendChild(containerTitle);
  document.body.appendChild(container);
}

function addContainerForStore(array, title) {
  const numberOfElements = array.length;
  const containerTitle = document.createElement("h2");
  containerTitle.textContent = title;
  const container = document.createElement("div");

  for (let i = 0; i < numberOfElements; i++) {
    const store = array[i].store;
    const name = store.name;
    const imageURL = store.image_background;
    const numberOfGames = store.games_count;

    const card = document.createElement("div");
    card.classList.add("game-card");
    container.appendChild(card);
    if (imageURL != null) {
      card.innerHTML = `
          <img src="${imageURL}" alt="${name}">`;
    }
    card.innerHTML += `
      <h4>Name: ${name}</h4>
                      <p>Release Date: ${numberOfGames}</p>
                  `;
  }
  document.body.appendChild(containerTitle);
  document.body.appendChild(container);
}

//ZADATAK 1
getGamesByMetacritic()
  .then((games) =>
    addContainer(games, "ZADATAK 1. prvih 20 igara po ratingu na metacriticu")
  )
  .catch(console.error);

//ZADATAK 2
const nameOfAGame = prompt("Unesi ime igre");
getGamesByName(nameOfAGame)
  .then((games) => {
    addContainer(
      games.slice(0, 10),
      `ZADATAK 2. prvih 10 igara sortirane po datumu izlaska koje sadrže ${nameOfAGame} u imenu`
    );
  })
  .catch(console.error);

//ZADATAK 3
const platfromNames = prompt(
  "Unesi ime platformi odvojenih zarezom bez razmaka"
);
const platforms = platfromNames.split(",").map((platform) => platform.trim());
console.log(platforms);
getGamesByPlatforms(platforms)
  .then((games) => {
    addContainer(games, `ZADATAK 3.`);
  })
  .catch(console.error);

//ZADATAK 4
const gameId = prompt("Unesi id igrice");

getGameById(gameId)
  .then((game) => {
    console.log("Game details:", game);
    addContainer([game], "Zadatak 4");
    const starRating = parseFloat(game.rating);
    const filledStars = Math.floor(starRating);
    const card = document.createElement("div");
    let stars = "&#9733";
    for (let i = 0; i < filledStars - 1; i++) {
      stars += " &#9733";
    }
    card.innerHTML += `<p>${stars}</p>`;
    document.body.appendChild(card);
  })
  .catch(console.error);

//ZADATAK 5
const gameIdForStore = prompt("Unesi id igrice");
getGameById(gameIdForStore)
  .then((game) => {
    addContainerForStore(game.stores, "Zadatak 5");
  })
  .catch(console.error);

//ZADATAK 6
const developersInuput = prompt(
  "Unesi imena developera odvojena zarezima, bez razmaka"
);
const developers = developersInuput.split(",");
getGamesByDevelopers(developers)
  .then((games) => {
    addContainer(games, developers);
  })
  .catch(console.error);

//ZADATAK 7
let startDate;
let endDate;
while (true) {
  startDate = prompt("Unesi poecetni datum (YYYY-MM-DD):");
  endDate = prompt("Unesi krajnji datum(YYYY-MM-DD):");
  if (startDate && endDate && new Date(startDate) < new Date(endDate)) break;
}

getGamesByDate(startDate, endDate)
  .then((games) => {
    addContainer(games, "Zadatak 7");
  })
  .catch(console.error);

//ZADATAK 8
//Nakon inputa pozivate /games sa parametrima za metacritic. Ispišite prvih 20 sortirane po metacriticu, pa onda imenu
let minScore;
let maxScore;
while (true) {
  minScore = +prompt("Unesi najmanji metacritic score:");
  maxScore = +prompt("Unesi najveci metacritic score:");
  if (minScore && maxScore && minScore < maxScore) break;
}

getGamesByMetacriticScore(minScore, maxScore)
  .then((games) => {
    addContainer(games, "Zadatak 8");
  })
  .catch(console.error);
