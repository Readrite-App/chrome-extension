
const LOGGING_ENDPOINT = 'https://readrite.appspot.com/v1/feedback';

const SESSION_UUID = create_UUID();

function log(params) {
  console.log('p', params);
  chrome.storage.local.get("browserID", function(data) {
    console.log(data);
    if (data.browserID) {
      console.log("LOG:", data.browserID, params)
      axios.post(LOGGING_ENDPOINT, {
        params: {
          'time' : Date(),
          'browserID' : data.browserID, // Always the same for the same browser
          'sessionID' : SESSION_UUID, // Changes with every page reload
          ...params,
        }
      }, { withCredentials: true })
      .then(() => {
        console.log("Logged: ", params);
      })
      .catch((error) => {
        console.log("Error logging: ", error);
      })
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