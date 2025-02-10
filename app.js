const input = document.querySelector("#input");
const submitBtn = document.querySelector("button");
const charh1 = document.querySelector(".char-name");
const mass = document.querySelector(".mass");
const height = document.querySelector(".height");
const birthYear = document.querySelector(".birth-year");
const gender = document.querySelector(".gender");
const hairColor = document.querySelector(".hair-color");
const skinColor = document.querySelector(".skin-color");
const eyeColor = document.querySelector(".eye-color");
const homeworld = document.querySelector(".homeworld");

let characters;

// Get all data from Star Wars API, pagination, results concatted
const getAllCharacters = async () => {
  let characters = [];
  let url = "https://swapi.dev/api/people/";

  try {
    while (url) {
      const res = await axios.get(url);
      characters = characters.concat(res.data.results);
      url = res.data.next; // URL for the next page
    }
    console.log("Characters loaded")
    return characters;
  } catch (error) {
    console.log("Error fetching characters:", error);
    return [];
  }
};

const getHomeworld = async (url) => {
  try {
      const res = await axios.get(url);
      const planet = res.data.name;
      return planet;
  } catch (error) {
    console.log("Error finding homeworld", error);
  }
};
const getShips = async (url) => {
  try {
    const requests = url.map(url => axios.get(url).then(res => res.data.name))

    const shipData = await Promise.all(requests)
    return shipData;

  } catch (error) {
    console.log("Error finding ships", error)
  }
}

const getFilms = async (url) => {
  try {
    const requests = url.map(url => axios.get(url).then(res => res.data.title))

    const filmData = await Promise.all(requests)
    return filmData;
    
  } catch (error) {
    console.log("Error finding films", error)
  }
}

const getCharObj = (name) => {
  return characters.find(character => character.name.toLowerCase() === name.toLowerCase()
  );
};

// Function updates h1 where name is displayed
const updateChar = (name) => {
  const charName = getCharObj(name);
  if(charName){
      charh1.textContent = charName.name
  } else {
    charh1.textContent = "Character not found"
    mass.textContent = "";
    height.textContent = "";
    birthYear.textContent = "";
    gender.textContent = "";
    hairColor.textContent = "";
    skinColor.textContent = "";
    eyeColor.textContent = "";
    homeworld.textContent = "";
  }
};

// Function to update all details fields
const updateCharDetails = async (name) => {
  const charDetails = await getCharObj(name);

  const planetUrl = charDetails.homeworld
  const homePlanet = await getHomeworld(planetUrl);

  const shipsUrl = charDetails.starships;
  const starShips = await getShips(shipsUrl)
  console.log(starShips)

  const filmUrl = charDetails.films;
  const films = await getFilms(filmUrl)
  console.log(films)


  if (charDetails) {
    charh1.textContent = charDetails.name
    mass.textContent = charDetails.mass;
    height.textContent = charDetails.height;
    birthYear.textContent = charDetails.birth_year;
    gender.textContent = charDetails.gender;
    hairColor.textContent = charDetails.hair_color;
    skinColor.textContent = charDetails.skin_color;
    eyeColor.textContent = charDetails.eye_color;
    homeworld.textContent = homePlanet;
  } else {
    console.log("Character details not found");
  }
};


// USER INPUT HANDLER
const handleUserInput = () => {
  const userInput = input.value.trim();
  if (userInput) {
    updateChar(userInput);
    updateCharDetails(userInput);
  }
};

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", async () => {
  try {
    characters = await getAllCharacters();
  } catch (error) {
    console.log("Unable to get character data", error);
  }
});

submitBtn.addEventListener("click", handleUserInput);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleUserInput();
  }
});
