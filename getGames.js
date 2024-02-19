const baseURL = "https://api.rawg.io/api";
const key = "464bc085dbbf4f33bcb2ccb39d36a6ec";

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
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
