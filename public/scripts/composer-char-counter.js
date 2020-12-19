
$(document).ready(function() {

  // Select the id to assign the event listener
  // Use "input" so it update on every char change
  $(".tweet-text").on("input", function() {

    // Length is the value of #text-tweet chars
    let length = $(this).val().length;

    // Grab the value of counter
    let counter = $(".counter");
    counter.val(140 - length);

    // Change the counter to red if
    // they are over the character limit
    if (length > 140) {
      counter.addClass("red");

    } else if (length < 141) {
      counter.removeClass("red");
      $('#error').slideUp(1000);

    } else if (length > 0) {
      $('#error').slideUp(1000);
    }
  });
});
