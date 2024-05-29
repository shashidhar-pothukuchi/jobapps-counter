chrome.runtime.onInstalled.addListener(() => {
  dailyReset();
});

chrome.runtime.onStartup.addListener(() => {
  dailyReset();
});

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

// Data Structure for cdate
// cdate:{date: date of the transation, applied: Jobs applied on that day}

dailyReset = () => {
  chrome.storage.local.get(["history", "cdate"], (res) => {
    const today = new Date().toLocaleDateString();

    if (res.cdate && res.cdate.date !== today) {
      chrome.storage.local.set(
        { cdate: { date: today, applied: 0 } },
        async () => {
          let history = res.history || [];
          history.push({ date: res.cdate.date, applied: res.cdate.applied });
          chrome.storage.local.set({ history });
          console.log("Initiated date with value", res.cdate);
        }
      );
    }
    if (!res.cdate) {
      chrome.storage.local.set({ cdate: { date: today, applied: 0 } });
    }
  });
};

addCount = () => {
  //   localStorage.setItem("counter", value);

  chrome.storage.local.get(["cdate", "totalJobs"], async (res) => {
    console.log("Background", res.cdate.applied);
    chrome.storage.local.set({
      cdate: { date: res.cdate.date, applied: res.cdate.applied + 1 },
    });
    chrome.storage.local.set({ totalJobs: res.totalJobs + 1 });
  });
};

deleteCount = () => {
  chrome.storage.local.get(["cdate", "totalJobs"], async (res) => {
    console.log("Background", res.cdate.applied);
    if (res.cdate.applied > 0) {
      chrome.storage.local.set({
        totalJobs: res.totalJobs - 1 >= 0 ? res.totalJobs - 1 : 0,
      });
      let cur = res.applied - 1 >= 0 ? res.applied - 1 : 0;
      chrome.storage.local.set({
        cdate: { date: res.cdate.date, applied: cur },
      });
    }
  });
};
