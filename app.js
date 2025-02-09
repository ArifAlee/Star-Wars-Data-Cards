
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

// Get data from starwars api
// const getCharData = async function () {
//   const charData = [];
//   let requests = [];
//   for (let i = 1; i < 84; i++) {
//     if (i === 17) continue;
//     //no details found for #17, will be skipped
      
//     requests.push(axios.get(`https://swapi.dev/api/people/${i}`)
//     .then(res => charData.push(res.data))
//     .catch(error => console.log(`Error fetching data for characters ${i}`, error)))
//   }
//   await Promise.all(requests)
//   return charData;
// };


const getAllCharacters = async () => {
  let characters = [];
  let url = "https://swapi.dev/api/people/";

  try {
    while (url) {
      const response = await axios.get(url);
      characters = characters.concat(response.data.results);
      url = response.data.next; // URL for the next page
    }
    return characters;
  } catch (error) {
    console.log("Error fetching characters:", error);
    return [];
  }
};

// Usage
getAllCharacters().then((characters) => {
  console.log(characters); // Array of all characters
});




const getCharObj = (name) => {
    return characters.find(character => character.name.toLowerCase() === name.toLowerCase()); 
};

// Function updates h1 where name is displayed
const updateChar = (name) => {
    const charName =  getCharObj(name);
    charh1.textContent = charName.name ? charName.name : "Character not found"
};

// Function to update all details fields
const updateCharDetails = (name) => {
    const charDetails = getCharObj(name);
    if(charDetails){
    mass.textContent = charDetails.mass;
    height.textContent = charDetails.height;
    birthYear.textContent = charDetails.birth_year;
    gender.textContent = charDetails.gender;
    hairColor.textContent = charDetails.hair_color;
    skinColor.textContent = charDetails.skin_color;
    eyeColor.textContent = charDetails.eye_color;
    homeworld.textContent = charDetails.homeworld;
  } else {
    console.log("Character details not found");
  }
};


// USER INPUT HANDLER
const handleUserInput = () => {
  const userInput = input.value.trim()
  if (userInput){
    updateChar(userInput)
    updateCharDetails(userInput)
  }
}

// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", async() => {
  try {
    characters = await getAllCharacters();
    console.log(characters)
  } catch(error) {
    console.log("Unable to get character data", error)
  }
});

submitBtn.addEventListener("click", handleUserInput)
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
   handleUserInput();
  }
});



