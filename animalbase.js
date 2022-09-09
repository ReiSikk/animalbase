"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let filterChoice;
let filteredAnimal = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  loadJSON();
  document.querySelector(".filter:nth-child(1)").addEventListener("click", getFilterChoice);
  document.querySelector(".filter:nth-child(2)").addEventListener("click", getFilterChoice);
  document.querySelector(".filter:nth-child(3)").addEventListener("click", getFilterChoice);
}

///// GET THE FILTER CHOICE
function getFilterChoice(event) {
  let filterChoice = this.dataset.filter;
  console.log(filterChoice);
  loadJSON(this.dataset.filter);
}

///SET FILTER CHOICE ///////
/* function setFilterChoice(animal) {
  console.log(option);
  if (animal.type === option) {
    return true;
  } else {
    return false;
  }
} */

function setDogFilter() {
  console.log("setDogFilter function called");
  if (animal.type !== "dog") {
    return false;
  } else {
    return true;
  }
}
function setCatFilter() {
  console.log("setCatFilter function called");
  if (animal.type !== "cat") {
    return false;
  } else {
    return true;
  }
}

async function loadJSON(option) {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects

  // how can I send prepareObjects the data option????????????hmmmm
  prepareObjects(jsonData, option);
}
function prepareObjects(jsonData, option) {
  allAnimals = jsonData.map(preapareObject);
  filteredAnimal = allAnimals.filter((animal) => {
    console.log(option);
    if (animal.type === option) {
      return true;
    } else {
      return false;
    }
  });

  // TODO: This might not be the function we want to call first

  // how could it display not allAnimals but a select few - sorted list

  //how could code now at this point wheter it is cat or dog etc
  if (option === "*") {
    displayList(allAnimals);
  }
  if (option === "dog") {
    displayList(filteredAnimal);
  }
  if (option === "cat") {
    displayList(filteredAnimal);
  }
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
