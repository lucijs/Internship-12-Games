import {
  getGamesByMetacritic,
  getGamesByName,
  getGamesByPlatforms,
  getGameById,
} from "./getGames.js";

function addContainer(array, title) {
  const numberOfElements = array.length;
  console.log(numberOfElements);
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
    console.log(games.slice(0, 10));
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
    console.log("Games by selected platforms:", games);
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
