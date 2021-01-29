// var styles = `
//     -webkit-transform: translateY(40px);
// `

// var styleSheet = document.createElement("style")
// styleSheet.type = "text/css"
// styleSheet.innerText = styles
// document.head.appendChild(styleSheet)

// document.body.parent.style.webkitTransform = 'translateY(40px)';
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
</style>


<header class=\"header\">
   <h1 class=\"logo\"><a href=\"#\">ReadRite</a></h1>
   <ul class=\"main-nav\">
      <li><a href=\"#\"><img src=\"https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1491958734/bqp32una36b06hmbulla.png\" alt=\"\" class=\"image--cover\"/> &nbsp<b>New York Time's bias:&nbsp</b>Left</a></li>
   </ul>
   <div class=\"progress-bar-container\">
      <div class=\"position-1\" style=\"width:100%\">L: 10%</div>
      <div class=\"position-2\" style=\"width:100%\">C: 5%</div>
      <div class=\"position-3\" style=\"width:100%\">R: 85%</div>
   </div>
   <ul class=\"main-nav\">
      <li><a href=\"#\"><b>Recommended Read:&nbsp</b> <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Associated_Press_logo_2012.svg/1200px-Associated_Press_logo_2012.svg.png\" alt=\"\" class=\"image--cover\"/></a></li>
      <li><a href=\"#\"><b>Alternative Perspective:&nbsp</b> <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/1200px-Fox_News_Channel_logo.svg.png\" alt=\"\" class=\"image--cover\"/></a></li>
   </ul>
   <ul class=\"main-nav\">
      <li><a href=\"#\" class=\"button-stale\" style=\"color:#383838\"><b><img src=\"https://i.ibb.co/W6Hrxkd/Moon-Copy.png\" alt=\"\" class=\"image--cover\" style=\"box-shadow: 0 0 0 0\"/>&nbsp This article may be stale</b></a></li>
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