let form = document.getElementById("target-form");
let applied = document.getElementById("applied-click");
let deleted = document.getElementById("delete-click");
let reseted = document.getElementById("reset-click");

// Setter getters for Target jobs
async function updateTarget(value) {
  chrome.storage.local.set({ target: value }, () => {
    document.getElementById("target-display").innerHTML = value;
    updateProgress(getApplied());
  });
}

async function getTarget() {
  chrome.storage.local.get(["target"], (res) => {
    return res.target;
  });
}

// Setter getters for Applied jobs
async function updateApplied(value) {
  chrome.storage.local.set({ applied: value }, () => {
    document.getElementById("applied-display").innerHTML = value;
  });
}

function getApplied() {
  chrome.storage.local.get(["applied"], (res) => {
    return res.applied;
  });
}

//Setter getters for Total jobs
async function updateTotalJobs(value) {
  chrome.storage.local.set({ totalJobs: value }, () => {
    document.getElementById("total-display").innerHTML = value;
  });
}

function getTotalJobs() {
  chrome.storage.local.get(["totalJobs"], (res) => {
    return res.totalJobs;
  });
}

async function updateProgress(value) {
  chrome.storage.local.get(["target"], (res) => {
    let bar = value * (100 / res.target);
    document.getElementById("target-bar").setAttribute("aria-valuenow", bar);
    document
      .getElementById("target-bar")
      .setAttribute("aria-valuemax", res.target);
    document
      .getElementById("target-bar")
      .setAttribute("style", `width:${bar}%`);
  });
}

async function settarget(e) {
  let counter = document.getElementById("target-number").value;
  console.log("Target", counter);
  await updateTarget(counter);
  e.preventDefault();
}

function addCounter() {
  // let cur = Number(getApplied()) + 1;
  chrome.storage.local.get(["applied"], async (res) => {
    console.log(res.applied);
    await updateApplied(res.applied + 1);
    await updateProgress(res.applied + 1);
    chrome.storage.local.get(["totalJobs"], async (res2) => {
      await updateTotalJobs(res2.totalJobs + 1);
    });
  });
}

function deleteCounter() {
  chrome.storage.local.get(["applied", "totalJobs"], async (res) => {
    if (res.applied > 0) {
      await updateTotalJobs(res.totalJobs - 1 >= 0 ? res.totalJobs - 1 : 0);
    }
    let cur = res.applied - 1 >= 0 ? res.applied - 1 : 0;
    await updateApplied(cur);
    await updateProgress(cur);
  });
}

function resetCounter() {
  updateApplied(0);
  updateProgress(0);
}

function initiate() {
  chrome.storage.local.get(["target", "applied", "totalJobs"], async (res) => {
    console.log("Main", res.target, res.applied, res.totalJobs);
    await updateTarget(res.target === null ? 0 : res.target);
    await updateApplied(isNaN(res.applied) ? 0 : res.applied);
    await updateTotalJobs(isNaN(res.totalJobs) ? 0 : res.totalJobs);
    updateProgress(res.applied);
  });
}

window.onload = initiate;

window.onfocus = initiate;
form.addEventListener("submit", settarget);
applied.addEventListener("click", addCounter);
deleted.addEventListener("click", deleteCounter);
reseted.addEventListener("click", resetCounter);
