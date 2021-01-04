chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    alert("YO");
});

window.addEventListener("message", function (event) {
    alert("HI");
});

console.log("KJKJ");