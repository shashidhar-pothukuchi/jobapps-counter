let form = document.getElementById("target-form");
let applied = document.getElementById("applied-click");
let deleted = document.getElementById("delete-click");
let reseted = document.getElementById("reset-click");

function updateTarget(value) {
  document.getElementById("target-display").innerHTML = value;
  localStorage.setItem("target", value);
}

function getTarget() {
  return document.getElementById("target-display").innerHTML;
}

function updateApplied(value) {
  document.getElementById("applied-display").innerHTML = value;
  localStorage.setItem("applied", value);
}

function getApplied() {
  return document.getElementById("applied-display").innerHTML;
}

function settarget(e) {
  let counter = document.getElementById("target-number").value;
  console.log(counter);
  updateTarget(counter);
  e.preventDefault();
}

function addCounter() {
  updateApplied(Number(getApplied()) + 1);
}

function deleteCounter() {
  updateApplied(Number(getApplied()) - 1);
}

function resetCounter() {
  updateApplied(0);
}

function initiate() {
  let targetVal = localStorage.getItem("target");
  let appliedVal = localStorage.getItem("applied");
  updateTarget(targetVal === null ? 0 : targetVal);
  updateApplied(isNaN(appliedVal) ? 0 : appliedVal);
}

window.onload = initiate;

form.addEventListener("submit", settarget);
applied.addEventListener("click", addCounter);
deleted.addEventListener("click", deleteCounter);
reseted.addEventListener("click", resetCounter);
