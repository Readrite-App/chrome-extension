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

const DOMAIN = 'https://readrite.uc.r.appspot.com';
const API_CLAIM_ENDPOINT = DOMAIN + '/v1/claims';
const API_ARTICLE_ENDPOINT = DOMAIN + '/v1/articles';
const LOGGING_ENDPOINT = DOMAIN + '/v1/feedback';
const DEFAULT_SOURCE_ICON_URL = 'https://cdn4.iconfinder.com/data/icons/business-and-marketing-21/32/business_marketing_advertising_News__Events-61-512.png';

const SESSION_UUID = create_UUID();



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(window).on("load", function() {
  log_articleLoad(window.location.href);

  // var client = new HttpClient();
  // client.get('https://readrite.uc.r.appspot.com/v1/claims?article_url='+ window.location.href +'&claims_list=[%27none%27]&user_test=true', function(response) {
  //   console.log("kidlaroi");
  //   console.log(response);
  //   console.log('https://readrite.uc.r.appspot.com/v1/claims?article_url='+ window.location.href +'&claims_list=[%27none%27]&user_test=true');
  // });

})
$(window).on("unload", function() {
  log_articleLeave(window.location.href);
})
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Highlighting text + showing Medium-like pop-up
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
rangy.init();
var highlighter = rangy.createHighlighter();
var highlightMetaData = {
  $elems: [],
  mediumPopups: [],
  infoPopups: [],
};
function removeHighlightFromSelectedText(highlighter) {
  highlighter.unhighlightSelection();
}
var isSameHighlight = false;
var highlightID = getRandomInt(0, 99999);
function createRangyClassApplier(className) {
  highlighter.addClassApplier(rangy.createClassApplier(className, {
      ignoreWhiteSpace: true,
      elementTagName: "span",
      onElementCreate: function($elem, classApplier) {
        if (!isSameHighlight) {
          // New highlight, so reset everything
          highlightID = getRandomInt(0, 99999);
          highlightMetaData.mediumPopups.map((val, idx) => val.destroy());
          highlightMetaData.infoPopups.map((val, idx) => val.destroy());
          highlightMetaData.infoPopups = [];
          highlightMetaData.mediumPopups = []; 
          highlightMetaData.$elems = [];
        }
        var tip = tippy($elem, {
          content: makeMediumPopupHTML(highlightID),
          allowHTML: true,
          interactive: true,
          interactiveDebounce: 999999, // Stay until user clicks away
        });
        highlightMetaData.mediumPopups.push(tip);
        highlightMetaData.$elems.push($elem);
        isSameHighlight = true;
      },
      normalize: true,
  }));
}
// Make Medium Pop-up above selected text
createRangyClassApplier('readrite-highlight');
$(document.body).mouseup(function (e) {
  const selection = rangy.getSelection();
  isSameHighlight = false;
  if (isSelectedTextValid(e)) {
    // Set unique classname for this highlight
    highlighter.highlightSelection('readrite-highlight');
    // Only show one Medium popup at first
    highlightMetaData.mediumPopups.map((val, idx) => idx === 0 ? val.show() : {}); //should be a for each
  }
});


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Pre-highlighting annotations
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function prehighlightmain(a)
  {
    if(window.find)
    {
      if(window.find(a)) {
        console.log("Main PreHighlight If");
        console.log(a);
        var rng=window.getSelection().getRangeAt(0);
        rng.deleteContents();
        const newDiv = document.createElement("mark");
        newDiv.id = "pizza" + getRandomInt(0, 99999).toString();
        const newContent = document.createTextNode(a);
        newDiv.appendChild(newContent);
        rng.insertNode(newDiv);

        console.log("elemishere");
        console.log(newDiv);
        console.log("idishere");
        console.log(newDiv.id);

        // var tipz = tippy('#' + newDiv.id, {
        //   content: "I'm a Tippy tooltip! : " + newDiv.id,
        //   // allowHTML: true,
        //   interactive: true,
        //   interactiveDebounce: 999999, // Stay until user clicks away
        // });


        // highlightMetaData.mediumPopups.push(tipz);
        // highlightMetaData.$elems.push('#' + newDiv.id);

        highlightMetaData.$elems.push('#' + newDiv.id);
        const selection = a;

    // Get annotations for this claim
      axios.get(API_CLAIM_ENDPOINT, {
        params: {
          article_url: window.location.href,
          claims_list: '[' + selection + ']',
        }
      }, { withCredentials: true })
      .then(res => {
        const data = res.data[Object.keys(res.data)[0]];
        // Create and show Info Pop-up
        if (data[0] === 'No recommendations found') {
          alert("No recommendations found for that claim");
          $mediumPopupElem.find('img').attr('src', chrome.extension.getURL("images/info.png"));
          return;
        }
        // highlightMetaData.$elems.map(($elem, idx) => {
          var tip = tippy('#' + newDiv.id, {
            content: makeInfoPopupHTML(data, selection),
            allowHTML: true,
            interactive: true,
            theme: 'informational',
          })
          highlightMetaData.infoPopups.push(tip);
        // });
        // Only show one Info popup
        highlightMetaData.infoPopups.map((val, idx) => idx === 0 ? val.show() : {})
        // Hide Medium popups that are showing
        highlightMetaData.mediumPopups.map((val, idx) => val.destroy());
      })
      .catch(err => {
        console.log("FAILURE", err);
      })





        while(window.find(a))
          {
            var rng=window.getSelection().getRangeAt(0);
            rng.deleteContents();
            const newDiv = document.createElement("mark");
            const newContent = document.createTextNode(a);
            newDiv.appendChild(newContent);
            rng.insertNode(newDiv);
          }
      } else if(window.find(a, aBackwards=true)) {
        console.log("Main PreHighlight Else");
        console.log(a);
        var rng=window.getSelection().getRangeAt(0);
        rng.deleteContents();
        const newDiv = document.createElement("mark");
        const newContent = document.createTextNode(a);
        newDiv.appendChild(newContent);
        rng.insertNode(newDiv);
        while(window.find(a, aBackwards=true))
          {
            var rng=window.getSelection().getRangeAt(0);
            rng.deleteContents();
            const newDiv = document.createElement("mark");
            const newContent = document.createTextNode(a);
            newDiv.appendChild(newContent);
            rng.insertNode(newDiv);
          }
      }
    }
    else if(document.body.createTextRange)
    {
      console.log("Main PreHighlight Elif");
      console.log(a);
      var rng=document.body.createTextRange();
      while(rng.findText(a))
      {
        rng.pasteHTML(a);
      }
    }
  }

  var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}


var i;


var client = new HttpClient();
client.get('https://readrite.uc.r.appspot.com/v2/articles?article_url=' + window.location.href, function(response) {
  var responseJson = JSON.parse(response);
  var prehighlightDict = responseJson['important_sentences'];
  if (prehighlightDict) {
    var prehighlightArrayKeys = Object.keys(prehighlightDict);
    for (i = 0; i < prehighlightArrayKeys.length; i++) {
      console.log("Main PreHighlight" + i);
      console.log(prehighlightArrayKeys[i]);
      prehighlightmain(prehighlightArrayKeys[i]);
    }
  }
});





////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Fetching claim-level annotations
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  return true
});
window.addEventListener("message", function (event) {
  // We only accept messages from this window to itself [i.e. not from any iframes]
  if (event.source != window || !event.data.action) { return; }
  // Fetch info for highlighted claim, display Informational Pop-Up
  if (event.data.action === "highlight") {

    // Set Medium Popup icon to be loading icon
    var $mediumPopupElem = $('#medium-popup-' + event.data.id);
    $mediumPopupElem.find('img').attr('src', chrome.extension.getURL("images/loading.gif"));

    // Get selected text
    const selection = rangy.getSelection().toString();

    // Get annotations for this claim
    axios.get(API_CLAIM_ENDPOINT, {
      params: {
        article_url: window.location.href,
        claims_list: '[' + selection + ']',
      }
    }, { withCredentials: true })
    .then(res => {
      console.log("FETCHED CLAIM for ", event.data.id);
      const data = res.data[Object.keys(res.data)[0]];
      // Create and show Info Pop-up
      if (data[0] === 'No recommendations found') {
        alert("No recommendations found for that claim");
        $mediumPopupElem.find('img').attr('src', chrome.extension.getURL("images/info.png"));
        return;
      }
      highlightMetaData.$elems.map(($elem, idx) => {
        var tip = tippy($elem, {
          content: makeInfoPopupHTML(data, selection),
          allowHTML: true,
          interactive: true,
          theme: 'informational',
        })
        highlightMetaData.infoPopups.push(tip);
      });
      // Only show one Info popup
      highlightMetaData.infoPopups.map((val, idx) => idx === 0 ? val.show() : {})
      // Hide Medium popups that are showing
      highlightMetaData.mediumPopups.map((val, idx) => val.destroy());
    })
    .catch(err => {
      console.log("FAILURE", err);
    })
  }
  else if (event.data.action === "log") {
    if (event.data.event === "annotationRecClick") {
      log_annotationRecClick(event.data.data.article, event.data.data.claim, event.data.data.rec, event.data.data.isRec);
    }
    else if (event.data.event === "annotationRecFeedback") {
      log_annotationRecFeedback(event.data.data.article, event.data.data.claim, event.data.data.rec, event.data.data.isRec, event.data.data.feeddback);
    }
  }
}, false);



////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Fetching article-level annotations
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
$(window).on('load', function() {
  // console.log($(document.body).text());
})
axios.get(API_ARTICLE_ENDPOINT, {
  params: {
    article_url: window.location.href,
  }
}, { withCredentials: true })
.then(res => {
  if (res.data.claims) {
    res.data.claims.map( (item, idx) => {
      // For each claim in article...
      //// Highlight claim
      //// Create and show Info Pop-up
    })
  }
})
.catch(err => {
  console.log("FAILURE", err);
})

function makeMediumPopupHTML(id) {
  ////////
  // Popup that shows when user selects un-highlighted text (e.g. like Medium does for its articles)
  ////////
  return `
    <div
      id="medium-popup-${id}"
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
  const { recommendedRead, alternativeRead } = parseRecAltReadData(data);
  const similarClaimsGiven = true;
  const { otherReads } = parseOtherReadData(data);
  const recReadHTML = recommendedRead ? `<h2 class="hover-tools-header">
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
                        <a 
                          href="${recommendedRead.url}" target="_blank" 
                          onClick="window.postMessage({ action: 'log', event: 'annotationRecClick', data: { 
                            article: '${window.location.href}', 
                            claim: '${claim}', 
                            rec: '${recommendedRead.url}',
                            isRec: true,
                          }})"
                        >
                          Keep reading
                        </a>
                    </div>
                    <div class="hover-tools-article-feedback">
                      <img 
                        src="${chrome.extension.getURL("images/happy.png")}" 
                        class="tooltip-feedback-icon" 
                        onClick="window.postMessage({ action: 'log', event: 'annotationRecFeedback', data: { 
                          article: '${window.location.href}', 
                          claim: '${claim}', 
                          rec: '${recommendedRead.url}',
                          isRec: true,
                          feedback: true
                        }})"
                      />
                      <img 
                        src="${chrome.extension.getURL("images/unhappy.png")}" 
                        class="tooltip-feedback-icon" 
                        onClick="window.postMessage({ action: 'log', event: 'annotationRecFeedback', data: { 
                          article: '${window.location.href}', 
                          claim: '${claim}', 
                          rec: '${recommendedRead.url}',
                          isRec: true,
                          feedback: false
                        }})"
                      />
                    </div>
                </div>` : '';
  const altReadHTML = alternativeRead ? `<h2 class="hover-tools-header">
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
                    <a 
                      href="${alternativeRead.url}" target="_blank"  
                      onClick="window.postMessage({ action: 'log', event: 'annotationRecClick', data: { 
                        article: '${window.location.href}', 
                        claim: '${claim}', 
                        rec: '${alternativeRead.url}',
                        isRec: false,
                      }})"
                    >
                      Keep reading
                  </a>
                  </div>
                  <div class="hover-tools-article-feedback">
                    <img 
                      src="${chrome.extension.getURL("images/happy.png")}" 
                      class="tooltip-feedback-icon" 
                      onClick="window.postMessage({ action: 'log', event: 'annotationRecFeedback', data: { 
                        article: '${window.location.href}', 
                        claim: '${claim}', 
                        rec: '${alternativeRead.url}',
                        isRec: false,
                        feedback: true
                      }})"
                    />
                    <img 
                      src="${chrome.extension.getURL("images/unhappy.png")}" 
                      class="tooltip-feedback-icon" 
                      onClick="window.postMessage({ action: 'log', event: 'annotationRecFeedback', data: { 
                        article: '${window.location.href}', 
                        claim: '${claim}', 
                        rec: '${alternativeRead.url}',
                        isRec: false,
                        feedback: false
                      }})"
                    />
                  </div>
              </div>` : '';
  const similarClaimsHTML = similarClaimsGiven ? `<h2 class="hover-tools-header">
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
            </div>` : '';
  // Return HTML
  return `<div id="information-popup">
            <div id="information-popup-content">
                ${recReadHTML}
                ${altReadHTML}
                ${similarClaimsHTML}
            </div>
            <div id="information-popup-footer">
              <img 
                src="https://static.wixstatic.com/media/5133d9_b8b55f31853d49f5bc397daecd43d057~mv2.png/v1/crop/x_43,y_6,w_565,h_299/fill/w_116,h_61,al_c,q_85,usm_0.66_1.00_0.01/readrite.webp"
              />
              Read Rite
            </div>
        </div>`;
}

function parseRecAltReadData(data) {
  const recRead = 'recommended_read' in data ? data['recommended_read']['article'] : null;
  const altRead = 'alternative_perspective' in data ? data['alternative_perspective']['article'] : null;
  const recommendedRead = readDataToDict(recRead);
  const alternativeRead = readDataToDict(altRead);
  return {
    recommendedRead, 
    alternativeRead
  }
}

function parseOtherReadData(data) {
  let output = [];
  const otherReads = data['other_similar'];
  otherReads.forEach(read => {
    output.push(readDataToDict(read));
  })
  return {
    otherReads: output
  }
}

function readDataToDict(read) {
  return {
    'author' : 'author' in read ? read['author'] : 'N/A',
    'source' : 'source' in read ? read['source'] : 'N/A',
    'sourceIcon' : 'https://2.bp.blogspot.com/-sJ8mGd6LmkU/T0ajVykwreI/AAAAAAAAESA/WNOI4QF4lIw/s1600/AP+logo+2012.png',
    'title' : 'title' in read ? read['title'] : 'No title provided',
    'url' : 'url' in read ? read['url'] : '',
    'summary' : truncateString('content' in read ? read['content'] : 'No summary provided', 100),
    'updateDate' : 'updateDate' in read ? read['updateDate'] : 'No date provided',
    'bias' : 'bias' in read ? read['bias'] : null,
    'reliability' : 'reliability' in read ? read['reliability'] : null,
  }
}

function defaultReads(data) {
  const recommendedRead = {
    'source' : 'AP',
    'sourceIcon' : '//logo.clearbit.com/apnews.com',
    'title' : 'Fake Video of Biden Circulates',
		'url' : 'https://apnews.com',
		'summary' : ' The video was shared on Twitter by a person who accused Biden of forgetting what state he was in. One version of the false video circulating on Twitter was viewed more than 1.1 million times in less than 24 hours',
		'updatedDate' : '10/20/2020',
		'bias' : 3,
		'reliability' : 0.3,
  };
  const alternativeRead = {
    'source' : 'Fox News',
    'sourceIcon' : '//logo.clearbit.com/foxnews.com',
    'title' : 'Disinformation Abounds as Election Day Nears',
		'url' : 'http://foxnews.com',
		'summary' : '"He forgets where he\'s at, he forgets who he\'s running against, he forgets what he\'s running for," she said. Asked when Biden had forgotten who he was running against, she cited the misleading clip the Trump campaign had been pushing all',
		'updatedDate' : '10/23/2020',
		'bias' : 3,
		'reliability' : 0.3,
  };
  return {
    recommendedRead, 
    alternativeRead
  }
}


function isSelectedTextValid(e) {
  // If no text selection, IGNORE
  if (!window.getSelection()) {
    return false;
  }
  // If mouseup occured in one of our ReadRite Pop-ups, IGNORE
  if ($(e.target).parents('.tippy-box').length > 0) {
    return false
  }
  // If no text selected, IGNORE
  const selectedText = window.getSelection().toString();
  if (selectedText.trim().length < 1) {
    return false;
  }
  return true;
}


function log(params) {
  chrome.storage.local.get("browserID", function(data) {
    if (data.browserID) {
      axios.get(LOGGING_ENDPOINT, {
        params: {
          time : Date(),
          browserID : data.browserID, // Always the same for the same browser
          sessionID : SESSION_UUID, // Changes with every page reload
          ...params,
        }
      }, { withCredentials: true })
      .then(res => {
        console.log("Logged: ", params);
      })
      .catch((err) => {
        console.log(err);
      })
      // chrome.runtime.sendMessage({
      //   action: 'sendPOSTRequest',
      //   url: LOGGING_ENDPOINT,
      //   params: {
      //     time : Date(),
      //     browserID : data.browserID, // Always the same for the same browser
      //     sessionID : SESSION_UUID, // Changes with every page reload
      //     ...params,
      //   }
      // }, response => {
      //   if (response.success) {
      //     console.log("Logged: ", params, response);
      //   }
      //   else {
      //     console.log("ERROR Logging");
      //   }
      // })
    }
  });
}

function log_articleLoad(article) {
  // User lands on an article that Readrite will annotate
  log({
    'article' : article,
    'event' : 'articleLoad',
  })
}
function log_articleLeave(article) {
  // User leaves an article that Readrite annotated
  log({
    'article' : article,
    'event' : 'articleLeave',
  })
}
function log_annotationMouseOver(article, claim) {
  // User moused over an annotation
  log({
    'article' : article,
    'claim' : claim,
    'event' : 'annotationMouseOver',
  })
}
function log_annotationMouseOut(article, claim) {
  // User moused away/annotation disappeared
  log({
    'article' : article,
    'claim' : claim,
    'event' : 'annotationMouseOut',
  })
}
function log_annotationRecClick(article, claim, rec, isRec) {
  // User clicked through on a recommendation in an annotation
  log({
    'article' : article,
    'claim' : claim,
    'rec' : rec,
    'event' : isRec ? 'annotationRecClick' : 'annotationAltClick',
  })
}
function log_annotationRecFeedback(article, claim, rec, isRec, feedback) {
  // User clicked “thumbs up” or “thumbs down”
  log({
    'article' : article,
    'claim' : claim,
    'rec' : rec,
    'feedback' : feedback,
    'event' : isRec ? 'annotationRecFeedback' : 'annotationAltFeedback',
  })
}
function log_annotationRecFeedbackText(article, claim, rec, isRec, feedbackText) {
  // User submitted text feedback from within readrite annotation
  log({
    'article' : article,
    'claim' : claim,
    'rec' : rec,
    'feedbackText' : feedbackText,
    'event' : isRec ? 'annotationRecFeedbackText' : 'annotationAltFeedbackText',
  })
}