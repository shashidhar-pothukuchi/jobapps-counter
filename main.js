let form = document.getElementById("target-form");
let applied = document.getElementById("applied-click");
let deleted = document.getElementById("delete-click");
let reseted = document.getElementById("reset-click");

function updateTarget(value) {
  document.getElementById("target-display").innerHTML = value;
  localStorage.setItem("target", value);
  updateProgress(getApplied());
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

function updateProgress(value) {
  let bar = value * (100 / getTarget());
  document.getElementById("target-bar").setAttribute("aria-valuenow", bar);
  document
    .getElementById("target-bar")
    .setAttribute("aria-valuemax", getTarget());
  document.getElementById("target-bar").setAttribute("style", `width:${bar}%`);
}

function settarget(e) {
  let counter = document.getElementById("target-number").value;
  console.log(counter);
  updateTarget(counter);
  e.preventDefault();
}

function addCounter() {
  let cur = Number(getApplied()) + 1;
  updateApplied(cur);
  updateProgress(cur);
}

function deleteCounter() {
  let cur = Number(getApplied()) - 1 >= 0 ? Number(getApplied()) - 1 : 0;
  updateApplied(cur);
  updateProgress(cur);
}

function resetCounter() {
  updateApplied(0);
  updateProgress(0);
}

function initiate() {
  let targetVal = localStorage.getItem("target");
  let appliedVal = localStorage.getItem("applied");
  updateTarget(targetVal === null ? 0 : targetVal);
  updateApplied(isNaN(appliedVal) ? 0 : appliedVal);
  updateProgress(getApplied());
}

window.onload = initiate;
// chrome.browserAction.setIcon({ path: "/main-icon.ico" });

form.addEventListener("submit", settarget);
applied.addEventListener("click", addCounter);
deleted.addEventListener("click", deleteCounter);
reseted.addEventListener("click", resetCounter);
