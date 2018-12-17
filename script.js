//Method allows local file/path to be used within extension
var gifSrc = chrome.runtime.getURL("/boom.gif");
var soundSrc = chrome.runtime.getURL("/explosion.mp3");

//HTML for popup
var popup = `<div class="popup"><img id="gif" src="${gifSrc}"/>`;
popup += `<audio class="sound-effect" src=${soundSrc}/></div>`;

var counter = 0;

$("a").on("click", togglePopup); //listener set on page load

function togglePopup() {
  counter++; //counter keeps track of clicks, so if a popup is not closed right away, it will dissapear when the next (or same) link is clicked

  if (counter === 2) {
    counter = 0;
    $(".popup").remove();
  }

  //'this' refers to the anchor tag in this context
  if ($(this).children(".popup").length > 0) {
    //animates popup box out when changed link is clicked again
    $(".popup").slideFadeToggle();
  } else {
    $(this)
      .attr("href", null)
      .css({
        "text-decoration": "none",
        color: "#333"
      });
    $(this).append(popup);
    $(".popup").slideFadeToggle();
    $(".sound-effect")[0].currentTime = 0;
    $(".sound-effect")[0].play();
  }
}

//Adds custom method to jquery through prototypal inheritance
$.fn.slideFadeToggle = function() {
  return this.animate({ height: "toggle" }, "fast");
};
