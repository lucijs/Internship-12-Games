const baseURL = "https://api.rawg.io/api";
const key = "464bc085dbbf4f33bcb2ccb39d36a6ec";

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

//Zadatak 1
export async function getGamesByMetacritic() {
  const url = `${baseURL}/games?key=${key}&ordering=-metacritic&page_size=20`;
  return getData(url).then((data) => data.results);
}

//Zadatak 2
export async function getGamesByName(name) {
  const url = `${baseURL}/games?key=${key}&ordering=-released&search=${name}`;
  return getData(url).then((data) => data.results);
}

//Zadatak 3
async function getPlatform(platformName) {
  const url = `${baseURL}/platforms?key=${key}&ordering=-games_count&search=${platformName}`;
  return getData(url).then((data) => data.results);
}

export async function getGamesByPlatforms(platformNames) {
  const platformIds = await Promise.all(
    platformNames.map((platform) => getPlatform(platform).id)
  );
  return getData(
    `${baseURL}/games?key=${key}&search=${platformIds.join(
      ","
    )}&page_size=20&ordering=-name`
  ).then((data) => data.results);
}

//Zadatak 4
export async function getGameById(id) {
  const url = `${baseURL}/games/${id}?key=${key}`;
  return getData(url);
}

//Zadatak 6
async function getDeveloper(developer) {
  const url = `${baseURL}/developers?key=${key}&search=${developer}`;
  return getData(url).then((data) => data.results);
}

export async function getGamesByDevelopers(developers) {
  const developerIds = await Promise.all(
    developers.map((developer) => getDeveloper(developer).id)
  );
  return getData(
    `${baseURL}/games?key=${key}&search=${developerIds.join(
      ","
    )}&page_size=10&ordering=-rating`
  ).then((data) => data.results);
}

//Zadatak 7
export async function getGamesByDate(startDate, endDate) {
  const url = `${baseURL}/games?key=${key}&dates=${startDate},${endDate}&page_size=10&ordering=-metacritic`;
  return getData(url).then((data) => data.results);
}

//Zadatak 8
export async function getGamesByMetacriticScore(minScore, maxScore) {
  const url = `${baseURL}/games?key=${key}&metacritic=${minScore},${maxScore}&page_size=20&ordering=-metacritic&-name`;
  return getData(url).then((data) => data.results);
}
