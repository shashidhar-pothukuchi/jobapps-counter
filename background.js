addCount = (value) => {
  //   localStorage.setItem("counter", value);

  chrome.storage.local.get(["applied"], async (res) => {
    console.log("Background", res.applied);
    chrome.storage.local.set({ applied: res.applied + 1 });
  });
};
chrome.commands.onCommand.addListener((command) => {
  if (command === "increment") {
    // Your custom functionality goes here
    // console.log("Ctrl+B was pressed!");
    addCount();
    addCounter();
    // You can add more actions here, such as sending a message to a content script
  }
});
