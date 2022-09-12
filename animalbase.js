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
  loadJSON();
  document.querySelector(".filter:nth-child(1)").addEventListener("click", getFilterChoice);
  document.querySelector(".filter:nth-child(2)").addEventListener("click", getFilterChoice);
  document.querySelector(".filter:nth-child(3)").addEventListener("click", getFilterChoice);
  document.querySelector("[data-sort=name]").addEventListener("click", getSortingChoice);
  document.querySelector("[data-sort=type]").addEventListener("click", getSortingChoice);
}

//GET SORTING CHOICE
function getSortingChoice(event) {
  let sortBy = this.dataset.sort;
  sortList(sortBy);
}

/// GET THE FILTER CHOICE
function getFilterChoice(event) {
  let filterChoice = this.dataset.filter;
  console.log(filterChoice);
  loadJSON(this.dataset.filter);
}

async function loadJSON(option) {
  const response = await fetch("animals.json");
  const jsonData = await response.json();
  // when loaded, prepare data objects

  //send prepareObjects the option(dataset.filter)
  prepareObjects(jsonData, option);
}
function prepareObjects(jsonData, option) {
  allAnimals = jsonData.map(preapareObject);
  filteredAnimal = allAnimals.filter((animal) => {
    if (animal.type === option) {
      return true;
    } else {
      return false;
    }
  });

  // TODO: This might not be the function we want to call first
  if (!option) {
    displayList(allAnimals);
  }
  //if option all display all animals
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

function sortList(sortBy) {
  let sortedList = allAnimals;
  if (sortBy === "name") {
    sortedList = sortedList.sort(sortByName);
  } else if (sortBy === "type") {
    sortedList = sortedList.sort(sortByType);
  }
  displayList(sortedList);
}

function sortByName(animalA, animalB) {
  if (animalA.name < animalB.name) {
    return -1;
  } else {
    return 1;
  }
}
function sortByType(animalA, animalB) {
  if (animalA.type < animalB.type) {
    return -1;
  } else {
    return 1;
  }
}
