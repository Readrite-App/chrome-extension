/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

// jQuery.extend({
//     highlight: function (node, re, nodeName, className) {
//         if (node.nodeType === 3) {
//             var match = node.data.match(re);
//             if (match) {
//                 var highlight = document.createElement(nodeName || 'span');
//                 highlight.className = className || 'highlight';
//                 var wordNode = node.splitText(match.index);
//                 wordNode.splitText(match[0].length);
//                 var wordClone = wordNode.cloneNode(true);
//                 highlight.appendChild(wordClone);
//                 wordNode.parentNode.replaceChild(highlight, wordNode);
//                 return 1; //skip added node in parent
//             }
//         } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
//                 !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
//                 !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
//             for (var i = 0; i < node.childNodes.length; i++) {
//                 i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
//             }
//         }
//         return 0;
//     }
// });

// jQuery.fn.unhighlight = function (options) {
//     var settings = { className: 'highlight', element: 'span' };
//     jQuery.extend(settings, options);

//     return this.find(settings.element + "." + settings.className).each(function () {
//         var parent = this.parentNode;
//         parent.replaceChild(this.firstChild, this);
//         parent.normalize();
//     }).end();
// };

// jQuery.fn.highlight = function (words, options) {
//     var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
//     jQuery.extend(settings, options);
    
//     if (words.constructor === String) {
//         words = [words];
//     }
//     words = jQuery.grep(words, function(word, i){
//       return word != '';
//     });
//     words = jQuery.map(words, function(word, i) {
//       return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
//     });
//     if (words.length == 0) { return this; };

//     var flag = settings.caseSensitive ? "" : "i";
//     var pattern = "(" + words.join("|") + ")";
//     if (settings.wordsOnly) {
//         pattern = "\\b" + pattern + "\\b";
//     }
//     var re = new RegExp(pattern, flag);
    
//     return this.each(function () {
//         jQuery.highlight(this, re, settings.element, settings.className);
//     });
// };






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function prehighlight(a)
  {
    if(window.find)
    {
      if(window.find(a)) {
        console.log("TopBar PreHighlight If");
        console.log(a);
        var rng=window.getSelection().getRangeAt(0);
        rng.deleteContents();
        const newDiv = document.createElement("mark");
        const newContent = document.createTextNode(a);
        newDiv.appendChild(newContent);
        rng.insertNode(newDiv);
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
        console.log("TopBar PreHighlight Else");
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
      console.log("TopBar PreHighlight If");
      console.log(a);
      var rng=document.body.createTextRange();
      while(rng.findText(a))
      {
        rng.pasteHTML(a);
      }
    }
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var cnn = {
  "scrape_url" : "https://www.cnn.com/articles",
  "article_scrape" : "h3:cd__headline",
  "title" : "h1",
  "author" : "span:metadata__byline__author",
  "content" : "div:zn-body__paragraph",
  "update_time" : "p:update-time",
  "bias" : "-5.69",
  "reliability" : "42.22",
  "whitelisted" : ["money.cnn.com"]
}
var ap = {
  "scrape_url" : "https://apnews.com/hub/ap-top-news",
  "article_scrape" : "h1:Component-h1-0-2-37",
  "title" : "h1",
  "author" : "span:Component-bylines-0-2-39",
  "content" : "div:Article",
  "update_time" : "span:Timestamp Component-root-0-2-41 Component-timestamp-0-2-40",
  "bias" : "-1.06",
  "reliability" : "51.98"
}
var msnbc = {
  "scrape_url" : "https://www.msnbc.com/",
  "bias" : "-20.87",
  "reliability" : "31.82",
  "whitelisted" : ["nbcnews.com"]
}

var fox_news = {
  "scrape_url" : "https://www.foxnews.com/",
  "bias" : "15.31",
  "reliability" : "26.75",
  "whitelisted" : ["foxbusiness.com"]
}

var breitbart = {
  "scrape_url" : "https://www.breitbart.com/",
  "bias" : "19.38",
  "reliability" : "28.76"
}

var atlantic = {
  "scrape_url" : "https://www.theatlantic.com/",
  "bias" : "-11.85",
  "reliability" : "41.76"
}

var cbs = {
  "scrape_url" : "https://www.cbsnews.com/",
  "bias" : "-3.56",
  "reliability" : "48.88"
}

var abc = {
  "scrape_url" : "https://abcnews.go.com/",
  "bias" : "-4.79",
  "reliability" : "48.22"
}

var bbc = {
  "scrape_url" : "https://www.bbc.com/",
  "bias" : "-2.78",
  "reliability" : "46.78"
}

var cnbc = {
  "scrape_url" : "https://www.cnbc.com/",
  "bias" : "-1.88",
  "reliability" : "47.04"
}

var wsj = {
  "scrape_url" : "https://www.wsj.com/",
  "bias" : "5.42",
  "reliability" : "49.48"
}

var ft = {
  "scrape_url" : "https://www.ft.com/",
  "bias" : "1.17",
  "reliability" : "46.32"
}

var thehill = {
  "scrape_url" : "https://thehill.com/",
  "bias" : "0.05",
  "reliability" : "45.99"
}

var upi = {
  "scrape_url" : "https://www.upi.com/",
  "bias" : "-0.27",
  "reliability" : "49.75"
}

var reuters = {
  "scrape_url" : "https://www.reuters.com/",
  "bias" : "-1.89",
  "reliability" : "51.04",
  "whitelisted" : ["newslink.reuters.com"]
}

var pew_research = {
  "scrape_url" : "https://www.pewresearch.org/",
  "bias" : "0", 
  "reliability" : "60"
}

var patch = {
  "scrape_url" : "https://patch.com/",
  "bias" : "-5.64",
  "reliability" : "48.81"
}

var usnews = {
  "scrape_url" : "https://www.usnews.com/",
  "bias" : "-3.31",
  "reliability" : "45.79",
  "whitelisted" : ["health.usnews.com", "money.usnews.com", "cars.usnews.com", "realestate.usnews.com"]
}

var foreignpolicy = {
  "scrape_url" : "https://foreignpolicy.com/",
  "bias" : "0.03",
  "reliability" : "41.92"
}

var christianitytoday = {
  "scrape_url" : "https://www.christianitytoday.com/",
  "bias" : "7.99",
  "reliability" : "43.92"
}

var upworthy = {
  "scrape_url" : "https://www.upworthy.com/",
  "bias" : "-3.98",
  "reliability" : "39.54",
  "whitelisted" : ["scoop.upworthy.com"]
}

var stripes = {
  "scrape_url" : "https://www.stripes.com/",
  "bias" : "0.43",
  "reliability" : "49.99"
}

var aljazeera = {
  "scrape_url" : "https://www.aljazeera.com/",
  "bias" : "-6.75",
  "reliability" : "45.14"
}

var news_sources = {
        "www.cnn.com" : cnn,
        "apnews.com" : ap,
        "www.msnbc.com" : msnbc,
        "www.foxnews.com" : fox_news,
        "www.theatlantic.com" : atlantic,
        "www.cbsnews.com" : cbs,
        "abcnews.go.com" : abc,
        "www.bbc.com" : bbc,
        "www.cnbc.com" : cnbc,
        "www.upi.com" : upi,
        "www.reuters.com" : reuters,
        "www.pewresearch.org" : pew_research,
        "patch.com" : patch,
        "www.usnews.com" : usnews,
        "foreignpolicy.com" : foreignpolicy,
        "www.christianitytoday.com" : christianitytoday,
        "www.upworthy.com" : upworthy,
        "www.stripes.com" : stripes,
        "www.aljazeera.com" : aljazeera
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var styles = `
//     -webkit-transform: translateY(40px);
// `

// var styleSheet = document.createElement("style")
// styleSheet.type = "text/css"
// styleSheet.innerText = styles
// document.head.appendChild(styleSheet)

// document.body.parent.style.webkitTransform = 'translateY(40px)';

// $("body").highlight("transmission");

const getTitle = (url) => {  
  return fetch(`https://crossorigin.me/${url}`)
    .then((response) => response.text())
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title = doc.querySelectorAll('title')[0];
      return title.innerText;
    });
};


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

var recread = {
  "url": "google.com",
  "domain": "google.com",
  "title": "test",
  "bias": 0,
  "reliability": 0,
  "updateDate": 0
};
var altpersp = {
  "url": "google.com",
  "domain": "google.com",
  "title": "test",
  "bias": 0,
  "reliability": 0,
  "updateDate": 0
};

var compDate = new Date();
compDate.setDate(compDate.getDate() - 14);

var i;


// var client = new HttpClient();
// client.get('https://readrite.uc.r.appspot.com/v2/articles?article_url=' + window.location.href, function(response) {
//   var responseJson = JSON.parse(response);
//   var prehighlightDict = responseJson['important_sentences'];
//   var prehighlightArrayKeys = Object.keys(prehighlightDict);
//   console.log(prehighlightArrayKeys);
//   for (i = 0; i < prehighlightArrayKeys.length; i++) {
//     console.log("impsent" + i);
//     prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-i]);
//   }
// });


client.get('https://readrite.uc.r.appspot.com/v1/claims?article_url='+ window.location.href +'&claims_list=[%27none%27]&user_test=true', function(response) {
    console.log("claimList Highlighting");
    var prehighlightArray = JSON.parse(response);
    var prehighlightArrayKeys = Object.keys(JSON.parse(response));
    const regex = /(?:(?<!\w)'((?:.|\n)+?'?)(?:(?<!s)'(?!\w)|(?<=s)'(?!([^']|\w'\w)+'(?!\w))))/g;
    const subst = `"`;

    // var numList = [4, 2, 3, 0, 1];

    for (i = 0; i < prehighlightArrayKeys.length; i++) {
      console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-i-1]);
      console.log("A- Prehighlight");
      prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-i-1]);
      console.log("B- Prehighlight");
      prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-i-1].replace(regex, subst));
      console.log("C- Prehighlight");
      prehighlight('"' + prehighlightArrayKeys[prehighlightArrayKeys.length-i-1].replace(regex, subst) + '"');
      console.log("D- Prehighlight");
      prehighlight('"' + prehighlightArrayKeys[prehighlightArrayKeys.length-i-1].replace(regex, subst) + ',"');
      console.log("E- Prehighlight");
      prehighlight('"' + prehighlightArrayKeys[prehighlightArrayKeys.length-i-1] + ',"');
    }

    // console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-0-1]);
    // prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-0-1]);
    // console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-1-1]);
    // prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-1-1]);
    // console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-2-1]);
    // prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-2-1]);
    // console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-3-1]);
    // prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-3-1]);
    // console.log("Looking for: " + prehighlightArrayKeys[prehighlightArrayKeys.length-4-1]);
    // prehighlight(prehighlightArrayKeys[prehighlightArrayKeys.length-4-1]);

  });





client.get('https://readrite.uc.r.appspot.com/v1/claims?article_url='+ window.location.href +'&claims_list=' + document.title, function(response) {
    var res = JSON.parse(response)[document.title.slice(1, -1).replace(/['",]+/g, '')];

    var recreadjson = res["recommended_read"]["article"];

    recread["domain"] = recreadjson["source"];
    recread["url"]= recreadjson["url"];
    recread["title"]= recreadjson["title"];
    recread["bias"]= recreadjson["bias"];
    recread["reliability"]= recreadjson["reliability"];
    recread["updateDate"]= new Date(recreadjson["updateDate"]);
    // recread["author"]= recreadjson["author"];
    // if (recread["author"]) {
    //   if (recread["author"].length == 1) {
    //     recread["author"] = recread["author"][0];
    //   } else if (recread["author"].length > 1) {
    //     recread["author"] = recread["author"].slice(0, recread["author"].length - 1).join(', ') + ", and " + recread["author"].slice(-1);
    //   }
    // } else {
    //   recread["author"] = null;
    // }


    var altperspjson = res["alternative_perspective"]["article"];

    altpersp["domain"] = altperspjson["source"];
    altpersp["url"]= altperspjson["url"];
    altpersp["title"]= altperspjson["title"];
    altpersp["bias"]= altperspjson["bias"];
    altpersp["reliability"]= altperspjson["reliability"];
    altpersp["updateDate"]= new Date(altperspjson["updateDate"]);
    // altpersp["author"]= altperspjson["author"];
    // if (altpersp["author"]) {
    //   if (altpersp["author"].length == 1) {
    //     altpersp["author"] = altpersp["author"][0];
    //   } else if (altpersp["author"].length > 1) {
    //     altpersp["author"] = altpersp["author"].slice(0, altpersp["author"].length - 1).join(', ') + ", and " + altpersp["author"].slice(-1);
    //   }
    // } else {
    //   altpersp["author"] = null;
    // }

    var numCenter = 0;
    var numLeft = 0;
    var numRight = 0;
    var numArticles = 0;

    var similarjsonArray = res["other_similar"];
    for (i = 0; i < similarjsonArray.length; i++) {
      numArticles++;
      if (similarjsonArray[i]["article"]["bias"] >= 2) {
        numRight++;
      } else if (similarjsonArray[i]["article"]["bias"] <= -2) {
        numLeft++;
      } else {
        numCenter++;
      }
    }

    var centerPerc = Math.floor((numCenter/numArticles) * 100);
    var leftPerc = Math.floor((numLeft/numArticles) * 100);
    var rightPerc = 100 - centerPerc - leftPerc;


    var articleLastUpdated = new Date(document.lastModified);
    var Difference_In_Time = compDate.getTime() - articleLastUpdated.getTime(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var isStale = Difference_In_Days > 14;


    var settings = {
      "url": "https://company.clearbit.com/v2/companies/find?domain=" + window.location.hostname,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer sk_b7fec50ce6370ac45bbb4f6213fb7e91"
      },
    };

    $.ajax(settings).done(function (response) {
      var websiteName = response.name;
      var articleLean = 0;

      if (window.location.hostname in news_sources) {
        if (news_sources[window.location.hostname].bias >= 2) {
        articleLean = 1;
        } else if (news_sources[window.location.hostname].bias <= -2){
          articleLean = -1;
        }
      } else {
        articleLean = -1;
      }








document.body.style.webkitTransform = 'translateY(70px)';

var iframe = document.createElement('iframe');
iframe.id = "iframe";
iframe.style = "border-style: none; width: 100%; height: 120px;"
var doc = iframe.contentDocument;

// document.documentElement.appendChild(iframe); //fastest way to append to DOM: http://jsperf.com/insertbefore-vs-appendchild/2
window.document.body.insertBefore(iframe, window.document.body.firstChild);
document.body.firstChild.style.webkitTransform = 'translateY(-70px)';
iframe.contentDocument.body.innerHTML = `
<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
  margin: 0;
  min-height: 100vh;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}


h2,
h3,
a {
  color: #fcfcfc;
}

a {
  text-decoration: none;
}



.logo {
  margin: 0;
  font-size: 1.2em;
}

.main-nav {
  margin-top: 5px;

}
.logo a,
.main-nav a {
  padding: 10px 15px;
  text-align: center;
  display: block;
}

.main-nav a {
  color: #fcfcfc;
  font-size: 0.85em;
}

.main-nav a:hover {
}



.header {
  padding-top: .5em;
  padding-bottom: .5em;
  border: 1px solid #a2a2a2;
  background-color: #2e2e2e;
  -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}


/* ================================= 
  Media Queries
==================================== */




@media (min-width: 769px) {
  .header,
  .main-nav {
    display: flex;
  }
  .header {
    flex-direction: column;
    align-items: center;
      .header{
    width: 80%;
    margin: 0 auto;
    max-width: 1150px;
  }
  }

}

@media (min-width: 1025px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
  }

}


.progress-bar-container{
  text-align: center; 
  width: 20%;
  height:20px;
  margin:0;
  padding:0;
  background:#dedede;
  display:flex;
  flex-direction: columns;
  border-radius:10px;
  overflow:hidden;
  font-size: 0.85em;
}

.position-1{
  width: 25%;
  background: #4492e6;
}

.position-2{
  width: 25%;
  background: #e8e8e8;
}

.position-3{
  width: 50%;
  background: #e6444e;
}

.position-4{
  width: 0%;
  background: #1EB785;
}
.last{
  border-radius:0 10px 10px 0;
}
.links{
  text-align:right;
  font-family: arial;
  margin-bottom:5px;
}
.links span{
  margin: 0 5px;
}

.wrapper {
  padding: 100px;
}

.image--cover {  
  vertical-align:middle;
  width: 25px;
  height: 25px;
  border-radius: 30%;
  margin: 0px;
  object-fit: cover;
  object-position: center right;
  box-shadow:
    0 0 0 1px #404040,
    0 0 0 2.5px #fcfcfc;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
.button-stale {
  background-color: #ffdf00;
  border-radius: 10px;
}

.main-nav :hover {
  color: #fcfcfc;
  background-color: #595959;
  border-radius: 10px;
}



/* 
  You want a simple and fancy tooltip?
  Just copy all [data-tooltip] blocks:
*/
[data-tooltip] {
  position: relative;
  z-index: 10;
}

/* Positioning and visibility settings of the tooltip */
[data-tooltip]:before,
[data-tooltip]:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  bottom: calc(100% + 5px); /* 5px is the size of the arrow */
  pointer-events: none;
  transition: 0.2s;
  will-change: transform;
}

/* The actual tooltip with a dynamic width */
[data-tooltip]:before {
  content: attr(data-tooltip);
  padding: 10px 18px;
  min-width: 50px;
  max-width: 300px;
  width: max-content;
  width: -moz-max-content;
  border-radius: 6px;
  font-size: 14px;
  background-color: rgba(59, 72, 80, 0.9);
  background-image: linear-gradient(30deg,
    rgba(59, 72, 80, 0.44),
    rgba(59, 68, 75, 0.44),
    rgba(60, 82, 88, 0.44));
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
  white-space: pre-wrap;
  transform: translate(-50%, -5px) scale(0.5);
}

/* Tooltip arrow */
[data-tooltip]:after {
  content: '';
  border-style: solid;
  border-width: 5px 5px 0px 5px; /* CSS triangle */
  border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
  transition-duration: 0s; /* If the mouse leaves the element, 
                              the transition effects for the 
                              tooltip arrow are "turned off" */
  transform-origin: top;   /* Orientation setting for the
                              slide-down effect */
  transform: translateX(-50%) scaleY(0);
}

/* Tooltip becomes visible at hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}
/* Scales from 0.5 to 1 -> grow effect */
[data-tooltip]:hover:before {
  transition-delay: 0.3s;
  transform: translate(-50%, -5px) scale(1);
}
/* 
  Arrow slide down effect only on mouseenter (NOT on mouseleave)
*/
[data-tooltip]:hover:after {
  transition-delay: 0.5s; /* Starting after the grow effect */
  transition-duration: 0.2s;
  transform: translateX(-50%) scaleY(1);
}
/*
  That's it.
*/






/*
  If you want some adjustability
  here are some orientation settings you can use:
*/

/* LEFT */
/* Tooltip + arrow */
[data-tooltip-location="left"]:before,
[data-tooltip-location="left"]:after {
  left: auto;
  right: calc(100% + 5px);
  bottom: 50%;
}

/* Tooltip */
[data-tooltip-location="left"]:before {
  transform: translate(-5px, 50%) scale(0.5);
}
[data-tooltip-location="left"]:hover:before {
  transform: translate(-5px, 50%) scale(1);
}

/* Arrow */
[data-tooltip-location="left"]:after {
  border-width: 5px 0px 5px 5px;
  border-color: transparent transparent transparent rgba(55, 64, 70, 0.9);
  transform-origin: left;
  transform: translateY(50%) scaleX(0);
}
[data-tooltip-location="left"]:hover:after {
  transform: translateY(50%) scaleX(1);
}



/* RIGHT */
[data-tooltip-location="right"]:before,
[data-tooltip-location="right"]:after {
  left: calc(100% + 5px);
  bottom: 50%;
}

[data-tooltip-location="right"]:before {
  transform: translate(5px, 50%) scale(0.5);
}
[data-tooltip-location="right"]:hover:before {
  transform: translate(5px, 50%) scale(1);
}

[data-tooltip-location="right"]:after {
  border-width: 5px 5px 5px 0px;
  border-color: transparent rgba(55, 64, 70, 0.9) transparent transparent;
  transform-origin: right;
  transform: translateY(50%) scaleX(0);
}
[data-tooltip-location="right"]:hover:after {
  transform: translateY(50%) scaleX(1);
}



/* BOTTOM */
[data-tooltip-location="bottom"]:before,
[data-tooltip-location="bottom"]:after {
  top: calc(100% + 5px);
  bottom: auto;
}

[data-tooltip-location="bottom"]:before {
  transform: translate(-50%, 5px) scale(0.5);
}
[data-tooltip-location="bottom"]:hover:before {
  transform: translate(-50%, 5px) scale(1);
}

[data-tooltip-location="bottom"]:after {
  border-width: 0px 5px 5px 5px;
  border-color: transparent transparent rgba(55, 64, 70, 0.9) transparent;
  transform-origin: bottom;
}



</style>


<header class=\"header\">
   <h1 class=\"logo\"><a href=\"#\">ReadRite</a></h1>
   <ul class=\"main-nav\">
      <li><a href=\"#\"><img src=\"//logo.clearbit.com/` + window.location.hostname + `\" alt=\"\" class=\"image--cover\"/> &nbsp<b>` + websiteName + `'s bias:&nbsp</b>` + (articleLean==0? "Center" : (articleLean==1? "Right" : "Left")) + `</a></li>
   </ul>
   <div class=\"progress-bar-container\">
      <div class=\"position-1\" style=\"width:` + leftPerc.toString() + `%\">L: ` + numLeft + `</div>
      <div class=\"position-2\" style=\"width:` + centerPerc.toString() + `%\">C: ` + numCenter + `</div>
      <div class=\"position-3\" style=\"width:` + rightPerc.toString() + `%\">R: ` + numRight + `</div>
   </div>
   <ul class=\"main-nav\">
      <li data-tooltip=\"` + (recread["title"] == null ? '' : recread["title"]) + (recread["bias"] == null ? '' : ' &#xa;Bias: ' + recread["bias"]) + (recread["reliability"] == null ? '' : ' Reliability: ' + recread["reliability"]) + `\"
       data-tooltip-location=\"bottom\"><a href=\"` + recread["url"] + `\" target=\"_blank\"><b>Recommended Read:&nbsp</b> <img src=\"//logo.clearbit.com/` + recread["domain"] + `\" alt=\"\" class=\"image--cover\"/></a></li>
      <li data-tooltip=\"` + (altpersp["title"] == null ? '' : altpersp["title"]) + (altpersp["bias"] == null ? '' : ' &#xa;Bias: ' + altpersp["bias"]) + (altpersp["reliability"] == null ? '' : ' Reliability: ' + altpersp["reliability"]) + `\"
       data-tooltip-location=\"bottom\"><a href=\"` + altpersp["url"] + `\" target=\"_blank\"><b>Alternative Perspective:&nbsp</b> <img src=\"//logo.clearbit.com/` + altpersp["domain"] + `\" alt=\"\" class=\"image--cover\"/></a></li>
   </ul>
   <ul class=\"main-nav\">
      `
      + (isStale ? '<li><a href=\"#\" class=\"button-stale\" style=\"color:#383838\"><b><img src=\"https://i.ibb.co/W6Hrxkd/Moon-Copy.png\" alt=\"\" class=\"image--cover\" style=\"box-shadow: 0 0 0 0\"/>&nbsp This article may be stale</b></a></li>' : '') + 
      `
      <li>&nbsp&nbsp</li>
   </ul>
</header>
`

// var newSpan = document.createElement("newSpan");
// newSpan.id = "newSpan";
// newSpan.innerHTML = "<header class=\"header\"><h1 class=\"logo\"><a href=\"#\">ReadRite</a></h1> <ul class=\"main-nav\"> <li><a href=\"#\"><img src=\"https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1491958734/bqp32una36b06hmbulla.png\" alt=\"\" class=\"image--cover\"/> &nbsp<b>New York Time's bias:&nbsp</b>Left</a></li></ul> <div class=\"progress-bar-container\"> <div class=\"position-1\" style=\"width:100%\">L: 10%</div><div class=\"position-2\" style=\"width:100%\">C: 5%</div><div class=\"position-3\" style=\"width:100%\">R: 85%</div></div><ul class=\"main-nav\"> <li><a href=\"#\"><b>Recommended Read:&nbsp</b> <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Associated_Press_logo_2012.svg/1200px-Associated_Press_logo_2012.svg.png\" alt=\"\" class=\"image--cover\"/></a></li><li><a href=\"#\"><b>Alternative Perspective:&nbsp</b> <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/1200px-Fox_News_Channel_logo.svg.png\" alt=\"\" class=\"image--cover\"/></a></li></ul> <ul class=\"main-nav\"> <li><a href=\"#\" class=\"button-stale\" style=\"color:#383838\"><b><img src=\"https://i.ibb.co/W6Hrxkd/Moon-Copy.png\" alt=\"\" class=\"image--cover\" style=\"box-shadow: 0 0 0 0\"/>&nbsp This article may be stale</b></a></li><li>&nbsp&nbsp</li></ul></header>"


// // newSpan.style.fontSize = "25px";
// // newSpan.style.fontWeight = "bold";
// // newSpan.textContent = "******Banner******"
// // newSpan.style.color = "red";
// var elemDiv = document.createElement('div');
// elemDiv.innerHTML=`<style scoped>

// html, body, div, span, applet, object, iframe,
// h1, h2, h3, h4, h5, h6, p, blockquote, pre,
// a, abbr, acronym, address, big, cite, code,
// del, dfn, em, img, ins, kbd, q, s, samp,
// small, strike, strong, sub, sup, tt, var,
// b, u, i, center,
// dl, dt, dd, ol, ul, li,
// fieldset, form, label, legend,
// table, caption, tbody, tfoot, thead, tr, th, td,
// article, aside, canvas, details, embed, 
// figure, figcaption, footer, header, hgroup, 
// menu, nav, output, ruby, section, summary,
// time, mark, audio, video {
//   margin: 0;
//   padding: 0;
//   border: 0;
//   font-size: 100%;
//   font: inherit;
//   vertical-align: baseline;
// }
// /* HTML5 display-role reset for older browsers */
// article, aside, details, figcaption, figure, 
// footer, header, hgroup, menu, nav, section {
//   display: block;
// }
// body {
//   line-height: 1;
// }
// ol, ul {
//   list-style: none;
// }
// blockquote, q {
//   quotes: none;
// }
// blockquote:before, blockquote:after,
// q:before, q:after {
//   content: '';
//   content: none;
// }
// table {
//   border-collapse: collapse;
//   border-spacing: 0;
// }

// * {
// 	box-sizing: border-box;
// }
// body {
// 	font-family: 'Montserrat', sans-serif;
// 	line-height: 1.4;
// 	margin: 0;
// 	min-height: 100vh;
// }
// ul {
//   margin: 0;
//   padding: 0;
//   list-style: none;
// }


// h2,
// h3,
// a {
// 	color: #fcfcfc;
// }

// a {
// 	text-decoration: none;
// }



// .logo {
// 	margin: 0;
// 	font-size: 1.2em;
// }

// .main-nav {
// 	margin-top: 5px;

// }
// .logo a,
// .main-nav a {
// 	padding: 10px 15px;
// 	text-align: center;
// 	display: block;
// }

// .main-nav a {
// 	color: #fcfcfc;
// 	font-size: 0.85em;
// }

// .main-nav a:hover {
// }



// .header {
// 	padding-top: .5em;
// 	padding-bottom: .5em;
// 	border: 1px solid #a2a2a2;
// 	background-color: #2e2e2e;
// 	-webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
// 	-moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
// 	box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
// 	-webkit-border-radius: 5px;
// 	-moz-border-radius: 5px;
// 	border-radius: 5px;
// }


// /* ================================= 
//   Media Queries
// ==================================== */




// @media (min-width: 769px) {
// 	.header,
// 	.main-nav {
// 		display: flex;
// 	}
// 	.header {
// 		flex-direction: column;
// 		align-items: center;
//     	.header{
// 		width: 80%;
// 		margin: 0 auto;
// 		max-width: 1150px;
// 	}
// 	}

// }

// @media (min-width: 1025px) {
// 	.header {
// 		flex-direction: row;
// 		justify-content: space-between;
// 	}

// }


// .progress-bar-container{
//   text-align: center; 
//   width: 20%;
//   height:20px;
//   margin:0;
//   padding:0;
//   background:#dedede;
//   display:flex;
//   flex-direction: columns;
//   border-radius:10px;
//   overflow:hidden;
//   font-size: 0.85em;
// }

// .position-1{
//   width: 25%;
//   background: #4492e6;
// }

// .position-2{
//   width: 25%;
//   background: #e8e8e8;
// }

// .position-3{
//   width: 50%;
//   background: #e6444e;
// }

// .position-4{
//   width: 0%;
//   background: #1EB785;
// }
// .last{
//   border-radius:0 10px 10px 0;
// }
// .links{
//   text-align:right;
//   font-family: arial;
//   margin-bottom:5px;
// }
// .links span{
//   margin: 0 5px;
// }

// .wrapper {
//   padding: 100px;
// }

// .image--cover {  
//   vertical-align:middle;
//   width: 25px;
//   height: 25px;
//   border-radius: 30%;
//   margin: 0px;
//   object-fit: cover;
//   object-position: center right;
//   box-shadow:
//     0 0 0 1px #404040,
//     0 0 0 2.5px #fcfcfc;
// }

// button {
//   padding: 0;
//   border: none;
//   font: inherit;
//   color: inherit;
//   background-color: transparent;
//   cursor: pointer;
// }
// .button-stale {
//   background-color: #ffdf00;
//   border-radius: 10px;
// }

// .main-nav :hover {
//   color: #fcfcfc;
//   background-color: #595959;
//   border-radius: 10px;
// }
// </style>
// `
// // elemDiv.style.cssText = 'width:100%;height:10%;background:rgb(255,255,255);text-align: center;';
// elemDiv.appendChild(newSpan);


// // var styles = `

// // `

// // var styleSheet = document.createElement("style")
// // styleSheet.type = "text/css"
// // styleSheet.innerText = styles
// // document.head.appendChild(styleSheet)

// window.document.body.insertBefore(elemDiv, window.document.body.firstChild);
});
});