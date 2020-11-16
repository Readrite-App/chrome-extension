////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// This file contains the JS code for the popup
// that appears when the "ReadRite" icon on the 
// Chrome Toolbar (in the top right of the browser)
// is clicked.
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const delay = 0;
setTimeout(function() { $("#loading").hide() }, delay);
setTimeout(function() { $("#content").removeClass('d-none') }, delay);


var backgroundPage = chrome.extension.getBackgroundPage();

var highlightBtn = document.getElementById('highlight');
var removeHighlightsBtn = document.getElementById('remove-highlights');
var radios = document.getElementsByName('color');
var shortcutLink = document.getElementById('shortcut-link');
var highlightCommandEl = document.getElementById('highlight-command');
var shortcutTextEl = document.getElementById('shortcut-text');
var closeWarningBtn = document.getElementById('close-warning');
var askConfirmationEl = document.getElementById('remove-ask-confirmation');
var highlightsListEl = document.getElementById('highlights-list');

function askConfirmation() {
    // Ask confirmation to remove all highlights on the page
    removeHighlightsBtn.style.display = 'none';
    askConfirmationEl.style.display = 'block';
}

function closeConfirmation() {
    removeHighlightsBtn.style.display = 'block';
    askConfirmationEl.style.display = 'none';
}

function removeHighlights() {
    backgroundPage.removeHighlights();
    window.close(); // Closing here also allows automatic refreshing of the highlight list
}

function colorChanged(color) {
    backgroundPage.changeColor(color);
}

function toggleHighlighterCursor() {
    backgroundPage.toggleHighlighterCursor();
    window.close();
}

function copyHighlights() {
    window.getSelection().selectAllChildren(highlightsListEl);
    document.execCommand("copy");
    window.getSelection().empty();
    

    // Let the user know the copy went through
    var checkmarkEl = document.createElement('span');
    checkmarkEl.style.color = '#00ff00';
    checkmarkEl.innerHTML = ' &#10004;';
}

// Register Events
highlightBtn.addEventListener('click', toggleHighlighterCursor);
removeHighlightsBtn.addEventListener('click', askConfirmation);
closeWarningBtn.addEventListener('click', closeWarning);

chrome.storage.sync.get('color', (values) => {
    var color = values.color;

    radios.forEach((radio) => {
        radio.addEventListener("click", (e) => { // Add event listener
            colorChanged(e.target.value);
            clearSelected();
            e.target.parentNode.classList.add('selected');
        });

        if (radio.value === color) { // Highlight the currently selected color saved in chrome storage
            clearSelected();
            radio.parentNode.classList.add('selected');
        }
    });
});

shortcutLink.addEventListener('click', () => { // Open the shortcuts Chrome settings page in a new tab
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

// Retrieve the shortcut for the highlight command from the Chrome settings and display it
chrome.commands.getAll((commands) => {
    commands.forEach((command) => {
        if (command.name === 'execute-highlight') {
            if (command.shortcut) {
                highlightCommandEl.textContent = command.shortcut;
            } else {
                shortcutTextEl.textContent = "No keyboard shortcut is currently defined."; // If no shortcut is defined, change the whole text to reflect this
            }
        }
    });
});

closeConfirmation(); // Trigger initially to hide the 'remove confirmation' section

function clearSelected() {
    var selected = document.getElementsByClassName('selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}
