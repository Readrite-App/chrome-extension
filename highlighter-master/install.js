chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("CHROME");
    return true;
});

window.addEventListener("message", function (event) {
    console.log("WINDOW");
});
