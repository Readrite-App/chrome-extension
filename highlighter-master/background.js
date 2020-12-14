////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// This file contains the JS code that runs 
// constantly in the background while the
// browser is open. It does NOT have access to
// the actual DOM of the pages loaded, which is
// why it needs to load the "contentScripts/actions/"
// files to execute code. The Content Scripts ARE ABLE
// to access the DOM of the loaded page, unlike this
// background script.
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// Print out local storage contents
chrome.storage.local.get(console.log);  

// Set unique ID for this browser
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
chrome.storage.local.get("browserID", function(data) {
    console.log(data);
    if (!data.browserID) {
        chrome.storage.local.set({browserID: create_UUID() }, function() {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error setting browserID in Chrome storage" +
                    ": " + chrome.runtime.lastError.message
                );
            }
        });
    }
});

// Add option when right-clicking
chrome.contextMenus.create({ title: "ReadRite", id: "readrite" });
chrome.contextMenus.create({ title: "Yellow", id: "yellow", parentId: "readrite", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Cyan", id: "cyan", parentId: "readrite", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Lime", id: "lime", parentId: "readrite", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Magenta", id: "magenta", parentId: "readrite", type:"radio", onclick: changeColorFromContext });

// Set default highlight to yellow
chrome.contextMenus.update("yellow", { checked: true });

// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // chrome.browserAction.setIcon({ path: "images/loading.png" });
    console.log("ACTION:", request.action);
    if (request.action && request.action == 'highlight') {
    }
});