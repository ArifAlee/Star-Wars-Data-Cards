let characterNames = [
  "Luke Skywalker",
  "C-3PO",
  "R2-D2",
  "Darth Vader",
  "Leia Organa",
  "Owen Lars",
  "Beru Whitesun Lars",
  "R5-D4",
  "Biggs Darklighter",
  "Obi-Wan Kenobi",
  "Anakin Skywalker",
  "Wilhuff Tarkin",
  "Chewbacca",
  "Han Solo",
  "Greedo",
  "Jabba Desilijic Tiure",
  "Wedge Antilles",
  "Jek Tono Porkins",
  "Yoda",
  "Palpatine",
  "Boba Fett",
  "IG-88",
  "Bossk",
  "Lando Calrissian",
  "Lobot",
  "Ackbar",
  "Mon Mothma",
  "Arvel Crynyd",
  "Wicket Systri Warrick",
  "Nien Nunb",
  "Qui-Gon Jinn",
  "Nute Gunray",
  "Finis Valorum",
  "Padmé Amidala",
  "Jar Jar Binks",
  "Roos Tarpals",
  "Rugor Nass",
  "Ric Olié",
  "Watto",
  "Sebulba",
  "Quarsh Panaka",
  "Shmi Skywalker",
  "Darth Maul",
  "Bib Fortuna",
  "Ayla Secura",
  "Ratts Tyerel",
  "Dud Bolt",
  "Gasgano",
  "Ben Quadinaros",
  "Mace Windu",
  "Ki-Adi-Mundi",
  "Kit Fisto",
  "Eeth Koth",
  "Adi Gallia",
  "Saesee Tiin",
  "Yarael Poof",
  "Plo Koon",
  "Mas Amedda",
  "Gregar Typho",
  "Cordé",
  "Cliegg Lars",
  "Poggle the Lesser",
  "Luminara Unduli",
  "Barriss Offee",
  "Dormé",
  "Dooku",
  "Bail Prestor Organa",
  "Jango Fett",
  "Zam Wesell",
  "Dexter Jettster",
  "Lama Su",
  "Taun We",
  "Jocasta Nu",
  "R4-P17",
  "Wat Tambor",
  "San Hill",
  "Shaak Ti",
  "Grievous",
  "Tarfful",
  "Raymus Antilles",
  "Sly Moore",
  "Tion Medon",
];

const resultsBox = document.querySelector(".result-box");
const input = document.querySelector("#input");
const list = document.querySelector("#item-list");
const submitButton = document.querySelector("button")
input.onkeyup = function () {
  let suggestions = [];
  let inputs = input.value;
  if (inputs.length) {
    suggestions = characterNames.filter((keyword) => {
      return keyword.toLowerCase().includes(inputs.toLowerCase());
    });
    console.log(suggestions);
    resultsBox.style.display = "block"; // Show the results box
  } else{
    resultsBox.style.display = "none"; // Hide the results box when no suggestions
  }
  if(!suggestions){
    resultsBox.style.display = "none";
  }
  displaySuggestion(suggestions);
};

function displaySuggestion(items) {
  const content = items.map((item) => {
    return `<li> ${item} </li>`;
  });

  list.innerHTML = content.join("");
}

list.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    const name = e.target.innerText;
    input.value = name;
    resultsBox.style.display = "none"; // Hide the results box when clicked
    submitButton.click();
}
});