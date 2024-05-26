addCount = () => {
  //   localStorage.setItem("counter", value);

  chrome.storage.local.get(["applied", "totalJobs"], async (res) => {
    console.log("Background", res.applied);
    chrome.storage.local.set({ applied: res.applied + 1 });
    chrome.storage.local.set({ totalJobs: res.totalJobs + 1 });
  });
};

deleteCount = () => {
  chrome.storage.local.get(["applied", "totalJobs"], async (res) => {
    console.log("Background", res.applied);
    if (res.applied > 0) {
      chrome.storage.local.set({
        totalJobs: res.totalJobs - 1 >= 0 ? res.totalJobs - 1 : 0,
      });
      let cur = res.applied - 1 >= 0 ? res.applied - 1 : 0;
      chrome.storage.local.set({ applied: cur });
    }
  });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === "increment") {
    addCount();
    addCounter();
  }
  if (command === "decrement") {
    deleteCount();
    deleteCounter();
  }
});
