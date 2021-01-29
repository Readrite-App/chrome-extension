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

chrome.storage.local.get("browserID", (data) => {
    $("#browserID").text(data.browserID);
});

$("#isActiveCheckbox").on('change', function() {
    if ($(this).is(':checked')) {
        backgroundPage.enableExtension();
    }
    else {
        backgroundPage.disableExtension();
    }
});