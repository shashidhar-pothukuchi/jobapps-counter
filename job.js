export default class Job {
  // Setter getters for Target jobs
  updateTarget(value) {
    document.getElementById("target-display").innerHTML = value;
    localStorage.setItem("target", value);
    updateProgress(getApplied());
  }

  getTarget() {
    return document.getElementById("target-display").innerHTML;
  }

  // Setter getters for Applied jobs
  updateApplied(value) {
    document.getElementById("applied-display").innerHTML = value;
    localStorage.setItem("applied", value);
  }

  getApplied() {
    return document.getElementById("applied-display").innerHTML;
  }

  //Setter getters for Total jobs
  updateTotalJobs(value) {
    document.getElementById("total-display").innerHTML = value;
    localStorage.setItem("totalJobs", value);
  }

  getTotalJobs() {
    return document.getElementById("total-display").innerHTML;
  }

  updateProgress(value) {
    let bar = value * (100 / getTarget());
    document.getElementById("target-bar").setAttribute("aria-valuenow", bar);
    document
      .getElementById("target-bar")
      .setAttribute("aria-valuemax", getTarget());
    document
      .getElementById("target-bar")
      .setAttribute("style", `width:${bar}%`);
  }

  settarget(e) {
    let counter = document.getElementById("target-number").value;
    console.log(counter);
    updateTarget(counter);
    e.preventDefault();
  }

  addCounter() {
    let cur = Number(getApplied()) + 1;
    updateApplied(cur);
    updateProgress(cur);
    updateTotalJobs(Number(getTotalJobs()) + 1);
  }

  deleteCounter() {
    if (Number(getApplied()) > 0) {
      updateTotalJobs(
        Number(getTotalJobs()) - 1 >= 0 ? Number(getTotalJobs()) - 1 : 0
      );
    }
    let cur = Number(getApplied()) - 1 >= 0 ? Number(getApplied()) - 1 : 0;
    updateApplied(cur);
    updateProgress(cur);
  }

  resetCounter() {
    updateApplied(0);
    updateProgress(0);
  }

  initiate() {
    let targetVal = localStorage.getItem("target");
    let appliedVal = localStorage.getItem("applied");
    let totalJobsVal = localStorage.getItem("totalJobs");
    updateTarget(targetVal === null ? 0 : targetVal);
    updateApplied(isNaN(appliedVal) ? 0 : appliedVal);
    updateTotalJobs(isNaN(totalJobsVal) ? 0 : totalJobsVal);
    updateProgress(getApplied());
  }
}
