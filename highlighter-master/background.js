"use strict";

// Add option when right-clicking
chrome.contextMenus.create({ title: "Highlight", onclick: highlightTextFromContext, contexts: ["selection"] });
chrome.contextMenus.create({ title: "Toggle Cursor", onclick: toggleHighlighterCursorFromContext });
chrome.contextMenus.create({ title: "Highlighter color", id: "highlight-colors" });
chrome.contextMenus.create({ title: "Yellow", id: "yellow", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Cyan", id: "cyan", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Lime", id: "lime", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });
chrome.contextMenus.create({ title: "Magenta", id: "magenta", parentId: "highlight-colors", type:"radio", onclick: changeColorFromContext });

// Get the initial color value
chrome.storage.sync.get('color', (values) => {
    var color = values.color ? values.color : "yellow";
    chrome.contextMenus.update(color, { checked: true });
});

// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // chrome.browserAction.setIcon({ path: "images/loading.png" });
    console.log("ACTION:", request.action);
    if (request.action && request.action == 'highlight') {
        highlightText();
    }
});

function highlightTextFromContext() {
    highlightText();
}

function highlightText() {
    chrome.tabs.executeScript({file: 'contentScripts/highlight.js'});
}

function toggleHighlighterCursorFromContext() {
    toggleHighlighterCursor();
}

function toggleHighlighterCursor() {
    chrome.tabs.executeScript({file: 'contentScripts/toggleHighlighterCursor.js'});
}

function removeHighlights() {
    chrome.tabs.executeScript({file: 'contentScripts/removeHighlights.js'});
}

function showHighlight(highlightId) {

    chrome.tabs.executeScript({
        code: `var highlightId = ${highlightId};`
    }, function() {
        chrome.tabs.executeScript({file: 'contentScripts/showHighlight.js'});
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