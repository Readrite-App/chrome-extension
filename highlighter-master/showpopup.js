"use strict";

$('div').mouseup(function() {
	let selectedText = getSelectedText();
});

function getSelectedText() {
  

	// If there is already a popup dialog, remove it
    if (document.contains(document.getElementById("share-snippet"))) {
        document.getElementById("share-snippet").remove();
    }

  // Add a new popup dialog
    if(window.getSelection().toString().trim().length > 0) {
    	const selection = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape);
    	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    	const posX = event.clientX - 30;
      const posY = event.clientY - 40 + scrollTop;

      var span = document.createElement("span");
      span.id = selection;

      if (window.getSelection) {
          var sel = window.getSelection();
          if (sel.rangeCount) {
              var range = sel.getRangeAt(0).cloneRange();
              range.surroundContents(span);
              sel.removeAllRanges();
              sel.addRange(range);
          }
      }

      document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: '+posY+'px; left: '+posX+'px;"><div class="speech-bubble"><div class="share-inside"><a href="javascript:void(0);" onClick=\'window.postMessage({ action: "highlight", spanid: "' + selection + '" }, "*");\'></a></div></div></div>');
    }
}

window.addEventListener("message", function(event) {
  // We only accept messages from this window to itself [i.e. not from any iframes]
  if (event.source != window)
    return;

  if (event.data.action && (event.data.action == "highlight")) {
  	chrome.runtime.sendMessage({ action: 'highlight' });
  	var data = null;

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			if (document.contains(document.getElementById("share-snippet"))) {
        document.getElementById("share-snippet").remove();
        document.getElementById(event.data.spanid).style.background = "yellow";
        document.getElementById(event.data.spanid).class = "tooltip-top";
        document.getElementById(event.data.spanid).setAttribute("data-tooltip", this.responseText);
			}
		}
	});

	xhr.open("GET", "https://wordsapiv1.p.rapidapi.com/words/" + window.getSelection().toString().trim() + "/syllables");
	xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
	xhr.setRequestHeader("x-rapidapi-key", "f51b750d2cmsh101510668ae26a9p145a93jsneb6a8bd02ad9");

	xhr.send(data);

  }
}, false);