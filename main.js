let form = document.getElementById("target-form");
let applied = document.getElementById("applied-click");
let deleted = document.getElementById("delete-click");
let reseted = document.getElementById("reset-click");

// Setter getters for Target jobs
async function updateTarget(value) {
  chrome.storage.local.set({ target: value }, async () => {
    document.getElementById("target-display").innerHTML = value;
    chrome.storage.local.get(["cdate", "target"], async (res) => {
      await updateProgress(res.cdate.applied, res.target);
    });
  });
}

// Setter getters for Applied jobs
async function updateApplied(todate, value) {
  chrome.storage.local.set({ cdate: { date: todate, applied: value } }, () => {
    document.getElementById("applied-display").innerHTML = value;
  });
}

//Setter getters for Total jobs
async function updateTotalJobs(value) {
  chrome.storage.local.set({ totalJobs: value }, () => {
    document.getElementById("total-display").innerHTML = value;
  });
}

async function updateProgress(value, target) {
  let bar = value * (100 / target);
  console.log("called update progress->", bar);
  document.getElementById("target-bar").setAttribute("aria-valuenow", bar);
  document.getElementById("target-bar").setAttribute("aria-valuemax", target);
  document.getElementById("target-bar").setAttribute("style", `width:${bar}%`);
  return;
}

async function settarget(e) {
  let counter = document.getElementById("target-number").value;
  console.log("Target", counter);
  await updateTarget(counter);
  e.preventDefault();
}

function addCounter() {
  // let cur = Number(getApplied()) + 1;
  chrome.storage.local.get(["cdate", "target"], async (res) => {
    console.log(res.cdate.applied);
    await updateApplied(res.cdate.date, res.cdate.applied + 1);
    await updateProgress(res.cdate.applied + 1, res.target);
    chrome.storage.local.get(["totalJobs"], async (res2) => {
      await updateTotalJobs(res2.totalJobs + 1);
    });
  });
}

function deleteCounter() {
  chrome.storage.local.get(["cdate", "totalJobs", "target"], async (res) => {
    if (res.cdate.applied > 0) {
      await updateTotalJobs(res.totalJobs - 1 >= 0 ? res.totalJobs - 1 : 0);
    }
    let cur = res.cdate.applied - 1 >= 0 ? res.cdate.applied - 1 : 0;
    await updateApplied(res.cdate.date, cur);
    await updateProgress(cur, res.target);
  });
}

function deletenCounter(value) {
  chrome.storage.local.get(["cdate", "totalJobs", "target"], async (res) => {
    if (res.cdate.applied > 0) {
<<<<<<< HEAD
      // await updateTotalJobs(
      //   res.totalJobs - value >= 0 ? res.totalJobs - value : 0
      // );
=======
      await updateTotalJobs(
        res.totalJobs - value >= 0 ? res.totalJobs - value : 0
      );
>>>>>>> 742dde2c613e202cc6ada29eccf3ebd57b0337fa
    }
    let cur = res.cdate.applied - value >= 0 ? res.cdate.applied - value : 0;
    await updateApplied(res.cdate.date, cur);
    await updateProgress(cur, res.target);
  });
}

function resetCounter() {
  chrome.storage.local.get(["cdate"], async (res) => {
    deletenCounter(res.cdate.applied);
    updateProgress(0);
  });
}

function initiate() {
  console.log("called update dom");
  chrome.storage.local.get(["target", "cdate", "totalJobs"], async (res) => {
    // console.log("Main", res.target, res.applied, res.totalJobs);
    if (!res.cdate) {
      let today = new Date().toLocaleDateString();
      chrome.storage.local.set({ cdate: { date: today, applied: 0 } });
    }

    await updateTarget(res.target === null ? 0 : res.target);
    await updateApplied(
      res.cdate.date,
      isNaN(res.cdate.applied) ? 0 : res.cdate.applied
    );
    await updateTotalJobs(isNaN(res.totalJobs) ? 0 : res.totalJobs);
    await updateProgress(res.cdate.applied, res.target);
  });
}

window.onload = initiate;

window.onfocus = initiate;

form.addEventListener("submit", settarget);
applied.addEventListener("click", addCounter);
deleted.addEventListener("click", deleteCounter);
reseted.addEventListener("click", resetCounter);
