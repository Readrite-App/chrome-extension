////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// This file contains the JS code that runs 
// as a Content Script on every loaded webpage.
// It DOES have access to the actual DOM of the
// pages loaded. Unlike the scripts of 
// "contentScripts/actions" (which must be called
// from background.js), this file is always run on
// every page load.
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const API_CLAIM_ENDPOINT = 'http://readrite.uc.r.appspot.com/v1/claims';
const API_ARTICLE_ENDPOINT = 'http://readrite.uc.r.appspot.com/v1/articles';
const LOGGING_ENDPOINT = 'http://readrite.uc.r.appspot.com/v1/feedback';
const DEFAULT_SOURCE_ICON_URL = 'https://cdn4.iconfinder.com/data/icons/business-and-marketing-21/32/business_marketing_advertising_News__Events-61-512.png';

// Highlighting + Medium Pop-up
rangy.init();
var highlighter = rangy.createHighlighter();
var inlineMediumPopup = null;

function removeHighlightFromSelectedText(highlighter) {
  highlighter.unhighlightSelection();
}
function reloadPage(button) {
  highlighter.serialize();
}

highlighter.addClassApplier(rangy.createClassApplier("highlight", {
    ignoreWhiteSpace: true,
    elementTagName: "span",
    onElementCreate: function($elem, classApplier) {
      console.log($elem);
      const id = getRandomInt(0, 9999999);
      inlineMediumPopup = tippy($elem, {
        content: makeMediumPopupHTML(id),
        allowHTML: true,
        interactive: true,
        interactiveDebounce: 999999, // Stay until user clicks away
      })
    },
    elementProperties: {
        onclick: function() {
            alert('hi');
            var highlight = highlighter.getHighlightForElement(this);
            if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                highlighter.removeHighlights( [highlight] );
            }
            return false;
        },
    }
}));

$(document.body).mouseup(function (e) {

  // If this mouseup was NOT due to text selection, IGNORE
  if (!window.getSelection()) {
    return;
  }
  // If mouseup occured in one of our ReadRite Pop-ups, IGNORE
  if ($(e.target).parents('.tippy-box').length > 0) {
    return;
  }
  // If no text selected, IGNORE
  const selectedText = window.getSelection().toString();
  if (selectedText.trim().length < 1) {
    return;
  }

  // Make Medium Pop-up above selected text for user to click highlight icon
  highlighter.highlightSelection("highlight");
});


//
// Send query to backend to get highlights
//
axios.get(API_ARTICLE_ENDPOINT, {
  params: {
    articleURL: window.location.href,
  }
}, { withCredentials: true })
.then(res => {
  console.log("FETCHED CLAIMS FOR ARTICLE")
  console.log(res);
  if (res.claims) {
    res.claims.map( (item, idx) => {
      // For each claim in article...
      //// Highlight claim
      // TODO
      //// Create and show Info Pop-up
      infoPopups[event.data.spanid] = tippy(document.getElementById(event.data.spanid), {
        content: makeInfoPopupHTML(res.data, selectedText),
        allowHTML: true,
        interactive: true,
        theme: 'informational',
      })
      infoPopups[event.data.spanid].show();
    })
  }
})
.catch(err => {
  console.log("FAILURE", err);
})

// ReadRite pop-up with information on article
let infoPopups = {};
window.addEventListener("message", function (event) {
  console.log(event);
  // We only accept messages from this window to itself [i.e. not from any iframes]
  if (event.source != window) {
    return;
  }

  // Fetch info for highlighted claim, display Informational Pop-Up
  if (event.data.action && event.data.action === "highlight") {
  
    const selectedText = window.getSelection().toString();

    // Set Medium Popup icon to be loading icon
    console.log(event.data.spanid);
    var $mediumPopupElem = $('#medium-popup-' + event.data.spanid);
    $mediumPopupElem.find('img').attr('src', chrome.extension.getURL("images/loading.gif"));

    axios.get(API_CLAIM_ENDPOINT, {
      params: {
        articleURL: 'https://www.cnn.com/2020/10/30/politics/what-matters-october-29/index.html',
        claims_list: selectedText,
      }
    }, { withCredentials: true })
    .then(res => {
      console.log("FETCHED CLAIM")
      console.log(res);
      document.getElementById(event.data.spanid).style.background = "yellow";
      document.getElementById(event.data.spanid).class = "tooltip-top";
      // Create and show Info Pop-up
      infoPopups[event.data.spanid] = tippy(document.getElementById(event.data.spanid), {
        content: makeInfoPopupHTML(res.data, selectedText),
        allowHTML: true,
        interactive: true,
        theme: 'informational',
      })
      infoPopups[event.data.spanid].show();
      // If the Medium Pop-up on this page is still showing, remove it
      if (inlineMediumPopup) {
        $(inlineMediumPopup.popper.id).remove();
        $("#tippy-" + inlineMediumPopup.id).remove();
        inlineMediumPopup.destroy();
      }
    })
    .catch(err => {
      console.log("FAILURE", err);
    })
  }
}, false);

function makeMediumPopupHTML(id) {
  ////////
  // Popup that shows when user selects un-highlighted text (e.g. like Medium does for its articles)
  ////////
  return `
    <div
      id="medium-popup"
      onClick="window.postMessage({ action: 'highlight', id: ${id} }, '*'); "
      style="display: flex; align-items: center;"
    >
      <img src="${chrome.extension.getURL("images/info.png")}" class="tooltip-icon" />
    </div>
  `;
}
function makeInfoPopupHTML(data, claim) {
  ////////
  // Popup that shows when user mouses over a highlighted claim and wants information on it
  ////////
  // Parse data
  const recommendedRead = {
    'source' : 'AP',
    'sourceIcon' : 'https://2.bp.blogspot.com/-sJ8mGd6LmkU/T0ajVykwreI/AAAAAAAAESA/WNOI4QF4lIw/s1600/AP+logo+2012.png',
    'title' : 'Fake Video of Biden Circulates',
		'url' : 'https://apnews.com',
		'summary' : ' The video was shared on Twitter by a person who accused Biden of forgetting what state he was in. One version of the false video circulating on Twitter was viewed more than 1.1 million times in less than 24 hours',
		'updatedDate' : '10/20/2020',
		'source_bias' : 3,
		'confidence' : 0.3,
  };
  const alternativeRead = {
    'source' : 'Fox News',
    'sourceIcon' : 'https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg',
    'title' : 'Disinformation Abounds as Election Day Nears',
		'url' : 'http://foxnews.com',
		'summary' : '"He forgets where he\'s at, he forgets who he\'s running against, he forgets what he\'s running for," she said. Asked when Biden had forgotten who he was running against, she cited the misleading clip the Trump campaign had been pushing all',
		'updatedDate' : '10/23/2020',
		'source_bias' : 3,
		'confidence' : 0.3,
  };
  // NOTES FOR ELENA
  // Return top 10 articles always
  // Rank every article in DB

  // console.log(data, claim, data[claim]);
  // const recommendedRead = data[claim][0];
  // const alternativeRead = data[claim][1];
  // Return HTML
  return `<div id="information-popup">
            <div id="information-popup-content">
                <h2 class="hover-tools-header">
                  <img 
                    src="https://www.pngitem.com/pimgs/m/453-4536097_recommended-land-recommended-icon-png-transparent-png.png" 
                    class="hover-tools-header-icon"
                  />
                  Recommended Read
                  <div class="hover-tools-article-byline">
                    ${recommendedRead.title} | ${recommendedRead.updateDate || 'No Date'}
                  </div>
                </h2>
                <div class="article-container">
                    <img 
                        src="${recommendedRead.sourceIcon || DEFAULT_SOURCE_ICON_URL}" 
                        class="hover-tools-article-news-icon"
                    />
                    <div class="hover-tools-article-text">
                        ${recommendedRead.summary}...
                        <a href="${recommendedRead.url}" target="_blank">Keep reading</a>
                    </div>
                    <div class="hover-tools-article-feedback">
                      <img 
                        src="${chrome.extension.getURL("images/happy.png")}" 
                        class="tooltip-icon" 
                        style="width:40px"
                        onClick="function() { log_feedback(article, claim, true) }"
                      />
                      <img 
                        src="${chrome.extension.getURL("images/unhappy.png")}" 
                        class="tooltip-icon" 
                        style="width:40px" 
                        onClick="function() { log_feedback(article, claim, false) }"
                      />
                    </div>
                </div>
                <h2 class="hover-tools-header">
                  <img 
                    src="https://static.thenounproject.com/png/331-200.png" 
                    class="hover-tools-header-icon"
                  />
                  Alternative View
                  <div class="hover-tools-article-byline">
                    ${alternativeRead.title} | ${alternativeRead.updateDate || 'No Date'}
                  </div>
                </h2>
                <div class="article-container">
                    <img
                        src="${alternativeRead.sourceIcon || DEFAULT_SOURCE_ICON_URL}"
                        class="hover-tools-article-news-icon"
                    />
                    <div class="hover-tools-article-text">
                        ${alternativeRead.summary}...
                        <a href="${alternativeRead.url}" target="_blank">Keep reading</a>
                    </div>
                    <div class="hover-tools-article-feedback">
                      <span style="font-style:italics; font-size: 10px;">Feedback</span>
                      <img 
                        src="${chrome.extension.getURL("images/happy.png")}" 
                        class="tooltip-icon" 
                        style="width:40px"
                        onClick="function() { log_feedback(article, claim, true) }"
                      />
                      <img 
                        src="${chrome.extension.getURL("images/unhappy.png")}" 
                        class="tooltip-icon" 
                        style="width:40px" 
                        onClick="function() { log_feedback(article, claim, false) }"
                      />
                    </div>
                </div> 
                <h2 class="hover-tools-header">
                  <img 
                    src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" 
                    class="hover-tools-header-icon"
                  />
                  Around the Web
                </h2>
                <p>Similar claims were found in the following articles:</p>
                <div class="similar-claims-container">
                  <div class="similar-claims-column">
                    <div class="similar-claims-article left">
                      <img 
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg" 
                        class="hover-tools-header-icon"
                      />
                      <span>News Site</span>
                    </div>
                    <div class="similar-claims-article left">
                      <img 
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg" 
                        class="hover-tools-header-icon"
                      />
                      <span>News Site 2</span>
                    </div>
                    <p>Left</p>
                  </div>
                  <div class="similar-claims-column">
                    <div class="similar-claims-article center-left">
                      <img 
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg" 
                        class="hover-tools-header-icon"
                      />
                      <span>News Site</span>
                    </div>
                    <p>Center Left</p>
                  </div>
                  <div class="similar-claims-column">
                    <div class="similar-claims-article center">
                      <img 
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg" 
                        class="hover-tools-header-icon"
                      />
                      <span>News Site</span>
                    </div>
                    <p>Center</p>
                  </div>
                  <div class="similar-claims-column">
                    <p>Center Right</p>
                  </div>
                  <div class="similar-claims-column">
                    <div class="similar-claims-article right">
                      <img 
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg" 
                        class="hover-tools-header-icon"
                      />
                      <span>News Site</span>
                    </div>
                    <p>Right</p>
                  </div>
                </div>
            </div>
            <div id="information-popup-footer">
              <img 
                src="https://static.wixstatic.com/media/5133d9_b8b55f31853d49f5bc397daecd43d057~mv2.png/v1/crop/x_43,y_6,w_565,h_299/fill/w_116,h_61,al_c,q_85,usm_0.66_1.00_0.01/readrite.webp"
              />
              Read Rite
            </div>
        </div>`;
}


// Logging
function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
const SESSION_UUID = create_UUID();
function log_feedback(article, claim, feedback) {
  log({
    'article' : article,
    'claim' : claim,
    'our_recommendation' : null,
    'feedback' : feedback,
  })
}
function log(params) {
  chrome.storage.local.get("browserID", function(data) {
    if (data.browserID) {
      axios.post(LOGGING_ENDPOINT, {
        params: {
          'time' : Date(),
          'browserID' : data.browserID, // Always the same for the same browser
          'sessionID' : SESSION_UUID, // Changes with every page reload
          ...params,
        }
      }, { withCredentials: true })
    }
  });
}
