"use strict";

$('div').mouseup(function() {
	let selectedText = getSelectedText();
});

function getSelectedText() {
	// If there is already a share dialog, remove it
    if (document.contains(document.getElementById("share-snippet"))) {
        document.getElementById("share-snippet").remove();
    }


    if(window.getSelection().toString().trim().length > 0) {
    	const selection = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape);
    	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    	const posX = event.clientX - 110;
        const posY = event.clientY + 20 + scrollTop;
        document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: '+posY+'px; left: '+posX+'px;"><div class="speech-bubble"><div class="share-inside"><a href="javascript:void(0);" onClick=\'window.postMessage({ action: "highlight" }, "*");\'>HIGHLIGHT</a></div></div></div>');
    }
        // return window.getSelection().toString();
    // } else if (document.selection) {
    //     return document.selection.createRange().text;
    // }
    // return '';
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
				if (this.status === 200) {
		        document.getElementById("share-snippet").innerHTML = '<div class="speech-bubble"><div class="share-inside">'+this.responseText+'</div></div>';
				} else {
					document.getElementById("share-snippet").innerHTML = '<div class="speech-bubble"><div class="share-inside">Received a 404: Word not found</div></div>';
				}
			}
		}
	});

	xhr.open("GET", "https://wordsapiv1.p.rapidapi.com/words/" + window.getSelection().toString().trim() + "/syllables");
	xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
	xhr.setRequestHeader("x-rapidapi-key", "f51b750d2cmsh101510668ae26a9p145a93jsneb6a8bd02ad9");

	xhr.send(data);

     // broadcasts it to rest of extension, or could just broadcast event.data.payload...
  } // else ignore messages seemingly not sent to yourself
}, false);


// const article = document.getElementById("article");


// // We could also add the  'touchend' event for touch devices, but since 
// // most iOS/Android browsers already show a dialog when you select 
// // text (often with a Share option) we'll skip that
// article.addEventListener('mouseup', handlerFunction, false);

// // Mouse up event handler function
// function handlerFunction(event) {
    
//     // If there is already a share dialog, remove it
//     if (document.contains(document.getElementById("share-snippet"))) {
//         document.getElementById("share-snippet").remove();
//     }
    
//     // Check if any text was selected
//     if(window.getSelection().toString().length > 0) {

//         // Get selected text and encode it
//         const selection = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape);
        
//         // Find out how much (if any) user has scrolled
//         var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
//         // Get cursor position
//         const posX = event.clientX - 110;
//         const posY = event.clientY + 20 + scrollTop;
      
//         // Create Twitter share URL
//         const shareUrl = 'http://twitter.com/share?text='+selection+'&url=https://awik.io';
        
//         // Append HTML to the body, create the "Tweet Selection" dialog
//         document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: '+posY+'px; left: '+posX+'px;"><div class="speech-bubble"><div class="share-inside"><a href="javascript:void(0);" onClick=\'window.open(\"'+shareUrl+'\", \"\", \"menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\");\'>TWEET SELECTION</a></div></div></div>');
//     }
// }







// console.log("working")
// var s = document.createElement('script');
// s.src = chrome.extension.getURL('sharect-master/dist/sharect.js');
// (document.head||document.documentElement).appendChild(s);
// s.onload = function() {
//     s.parentNode.removeChild(s);
// };