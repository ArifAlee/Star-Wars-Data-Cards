import { Characters } from "./characters.js";

const input = document.querySelector("#input");
const submitBtn = document.querySelector("button");
const name = document.querySelector(".name");
const height = document.querySelector(".height");
const birthYear = document.querySelector(".birth-year");
const gender = document.querySelector(".gender");
const hairColor = document.querySelector(".hair-color");
const skinColor = document.querySelector(".skin-color");
const eyeColor = document.querySelector(".eye-color");
const homeworld = document.querySelector(".homeworld");

submitBtn.addEventListener("click", () => {
  const userInput = input.value;
  // updateChar(userInput);
  updateCharDetails(userInput);
});
// Submit by pressing ENTER
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const userInput = input.value;
    // updateChar(userInput);
    updateCharDetails(userInput)
  }
});

// Function updates h1 where name is displayed
const updateChar = async function (name) {
  const charh1 = document.querySelector(".char-name");
  try {
    const charName = await getCharObj(name);
    charh1.textContent = charName.name;
  } catch (error) {
    console.log("Error updating name", error);
  }
};

// Function to update all details fields
const updateCharDetails = async function (char) {
  try {
    const charDetails = await getCharObj(char);
    name.textContent = charDetails.name;
    height.textContent = charDetails.height;
    // mass.textContent = charDetails.mass; -----include!!
    birthYear.textContent = charDetails.birth_year;
    gender.textContent = charDetails.gender;
    hairColor.textContent = charDetails.hair_color;
    skinColor.textContent = charDetails.skin_color;
    eyeColor.textContent = charDetails.eye_color;
    homeworld.textContent = charDetails.homeworld;
  } catch (error) {
    console.log("Error updating details", error);
  }
};

// Get data from starwars api
const getCharData = async function (num) {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${num}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

// Function retrieves all data and stores it
const allData = async function () {
  const charData = [];
  for (let i = 1; i < 84; i++) {
    if (i === 17) {
      //no details found for #17, will be skipped
      continue;
    }
    try {
      const data = await getCharData(i);
      charData.push(data);
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  }
  return charData;
};

const getCharObj = async function (name) {
  try {
    const characters = await allData();

    return characters.find(
      (character) => character.name.toLowerCase() === name.toLowerCase()
    );
    // console.log(characters.charData.map((char) => char.name))
  } catch (error) {
    console.log("Error creating object", error);
  }
};


