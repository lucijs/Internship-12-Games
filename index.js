import { getGamesByMetacritic, getGamesByName } from "./getGames.js";

function addContainer(array, title) {
  const numberOfElements = array.length;
  console.log(numberOfElements);
  const containerTitle = document.createElement("h2");

  containerTitle.textContent = title;

  const container = document.createElement("div");

  for (let i = 0; i < numberOfElements; i++) {
    console.log(i);
    const name = array[i].name;
    const released = array[i].released;
    const imageURL = array[i].background_image;
    const metacritic = array[i].metacritic;

    const card = document.createElement("div");
    card.classList.add("game-card");
    container.appendChild(card);
    card.innerHTML = `
                    <img src="${imageURL}" alt="${name}">
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
getGamesByName(nameOfAGame).then((games) => {
  console.log(games.slice(0, 10));
  addContainer(
    games.slice(0, 10),
    `ZADATAK 2. prvih 10 igara sortirane po datumu izlaska koje sadrže ${nameOfAGame} u imenu`
  );
});

//ZADATAK 3 
//Pozivanjem /platforms uzmite platforme na kojima se igre nalaze. Od toga uzmite top 10 
//platforma po broju igara i u prompt upitajte korisnika da upise ime svih platforma koje želi. 
//Korisnik upisuje imena platforma odvojena zarezima, a nakon sto pronađete koje su to platforme 
//opet zovete /games i tražite igre po tim platformama, uzmite 20 i sortirajte ih po imenu 
