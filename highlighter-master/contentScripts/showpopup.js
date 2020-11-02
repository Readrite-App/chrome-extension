// Content file -- can access information on webpage
// Listen to text selection event

"use strict";

$('div').mouseup(function () {
  let selectedText = getSelectedText();
});

function getSelectedText() {

  // If there is already a popup dialog, remove it
  if (document.contains(document.getElementById("share-snippet"))) {
    document.getElementById("share-snippet").remove();
  }

  // Add a new popup dialog
  if (window.getSelection().toString().trim().length > 0) {
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

    console.log("BRO");

    document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: ' + posY + 'px; left: ' + posX + 'px;"><div class="speech-bubble"><div class="share-inside"><a href="javascript:void(0);" onClick=\'window.postMessage({ action: "highlight", spanid: "' + selection + '" }, "*");\'></a></div></div></div>');
  }
}

window.addEventListener("message", function (event) {
  // We only accept messages from this window to itself [i.e. not from any iframes]
  if (event.source != window)
    return;

  if (event.data.action && (event.data.action == "highlight")) {
    chrome.runtime.sendMessage({ action: 'highlight' });
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (document.contains(document.getElementById("share-snippet"))) {
          document.getElementById("share-snippet").remove();
          document.getElementById(event.data.spanid).style.background = "yellow";
          document.getElementById(event.data.spanid).class = "tooltip-top";
          // document.getElementById(event.data.spanid).setAttribute("data-tooltip", this.responseText);
          tippy(document.getElementById(event.data.spanid), {
            content: makePopupHTML(this.responseText),
            allowHTML: true,
          })
          console.log("HEEEYA");
        }
      }
    });

    xhr.open("GET", "http://readrite.uc.r.appspot.com/v1/claims?articleURL=https://www.cnn.com/2020/10/30/politics/what-matters-october-29/index.html&claims_list=trump,china,biden")
    xhr.withCredentials = false; 
    xhr.send(data);

  }
}, false);


function makePopupHTML(data) {
  return `<div id="information-popup">
            <div id="information-popup-title">
              <img 
                src="https://static.wixstatic.com/media/5133d9_b8b55f31853d49f5bc397daecd43d057~mv2.png/v1/crop/x_43,y_6,w_565,h_299/fill/w_116,h_61,al_c,q_85,usm_0.66_1.00_0.01/readrite.webp"
              />
              Read Rite
            </div>
            <div id="information-popup-content">
                <h2 class="hover-tools-header">
                  <img 
                    src="https://www.pngitem.com/pimgs/m/453-4536097_recommended-land-recommended-icon-png-transparent-png.png" 
                    class="hover-tools-header-icon"
                  />
                  Recommended Read
                </h2>
                <div class="article-container">
                    <img 
                        src="https://2.bp.blogspot.com/-sJ8mGd6LmkU/T0ajVykwreI/AAAAAAAAESA/WNOI4QF4lIw/s1600/AP+logo+2012.png" 
                        class="hover-tools-article-news-icon"
                    />
                    <div class="hover-tools-article-text">
                        The video was shared on Twitter by a person who accused Biden of forgetting what state he was in.
                        One version of the false video circulating on Twitter was viewed more than 1.1 million times in less than 24 hours...
                        <a href="nytimes.com">Keep reading</a>
                        <br />
                        <div class="hover-tools-article-byline">
                          Fake Video of Biden Circulates | October 20, 2020.
                        </div>
                    </div>
                </div>
                <h2 class="hover-tools-header">
                  <img 
                    src="https://static.thenounproject.com/png/331-200.png" 
                    class="hover-tools-header-icon"
                  />
                  Alternative Perspective
                </h2>
                <div class="article-container">
                    <img
                        src="https://lolaredpr.com/wp-content/uploads/transparent-wsj-logo-png-the-wall-street-journal-c-8c851bcb8d9e4624.jpg"
                        class="hover-tools-article-news-icon"
                    />
                    <div class="hover-tools-article-text">
                        "He forgets where he's at, he forgets who he's running against, he forgets what he's running for," she said.
                        Asked when Biden had forgotten who he was running against, she cited the misleading clip the Trump campaign had been pushing all...
                        <a href="nytimes.com">Keep reading</a>
                        <br />
                        <div class="hover-tools-article-byline">
                          <em>Disinformation Abounds as Election Day Nears</em> | October 23, 2020.
                        </div>
                    </div>
                </div> 
                <h2 class="hover-tools-header">
                  <img 
                    src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" 
                    class="hover-tools-header-icon"
                  />
                  Claim Check
                </h2>
                <p>Similar claims were found in the following articles:</p>
                <div class="similar-claims-container">
                  <div class="similar-claims-article">
                    <img
                      src="https://cdn.theorg.com/e0fa6f8e-398e-4680-a519-8d41aa29e02b_medium.jpg"
                      class="hover-tools-article-news-icon"
                    />
                    <p>Article Title</p>
                    <p>October 29, 2020</p>
                  </div>
                  <div class="similar-claims-article">
                    <img
                      src="https://1ridb82q22462hzl6811wfgg-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Slate-Logo.jpg"
                      class="hover-tools-article-news-icon"
                    />
                    <p>Article Title</p>
                    <p>October 4, 2020</p>
                  </div>
                  <div class="similar-claims-article">
                    <img
                      src="https://cdn.theorg.com/e0fa6f8e-398e-4680-a519-8d41aa29e02b_medium.jpg"
                      class="hover-tools-article-news-icon"
                    />
                    <p>Article Title</p>
                    <p>October 19, 2020</p>
                  </div>
                </div>
            </div>
        </div>`;
}