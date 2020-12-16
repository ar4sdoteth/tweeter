console.log(`composer-char-counter loaded`)

$(document).ready(function() {
  console.log(`Ready Document One`)
  // Select the id to assign the event listener 
  // Use "input" so it update on every char change
  $("#tweet-text").on("input", function () {
    // Length is the value of #text-tweet chars
    let length = $(this).val().length;
    // Grab the value of counter 
    let counter = $(".counter");
    counter.val(140 - length);
    // Change the counter to red if negative
    console.log(length)
    if (length > 140) {
      counter.addClass("red");
    } else if (length < 141) {
      counter.removeClass("red");
    }
  })
});
