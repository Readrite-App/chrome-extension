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

// Add option when right-clicking
chrome.contextMenus.create({ title: "Highlighter color", id: "highlight-colors" });
chrome.contextMenus.create({ title: "Yellow", id: "yellow", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Cyan", id: "cyan", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Lime", id: "lime", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Magenta", id: "magenta", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });

// Set default highlight to yellow
chrome.contextMenus.update("yellow", { checked: true });

// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // chrome.browserAction.setIcon({ path: "images/loading.png" });
    console.log("ACTION:", request.action);
    if (request.action && request.action == 'highlight') {
        highlightText();
    }
});


function highlightText() {
    chrome.tabs.executeScript({file: 'contentScripts/actions/highlight.js'});
}

function toggleHighlighterCursor() {
    chrome.tabs.executeScript({file: 'contentScripts/actions/toggleHighlighterCursor.js'});
}

function removeHighlights() {
    chrome.tabs.executeScript({file: 'contentScripts/actions/removeHighlights.js'});
}

function showHighlight(highlightId) {
    chrome.tabs.executeScript({
        code: `var highlightId = ${highlightId};`
    }, function() {
        chrome.tabs.executeScript({file: 'contentScripts/actions/showHighlight.js'});
    });
}

function changeColorFromContext(info) {
    changeColor(info.menuItemId);
}
function changeColor(color) {
    chrome.storage.sync.set({ color: color });
    // Also update the context menu
    chrome.contextMenus.update(color, { checked: true });
}