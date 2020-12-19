console.log(`composer-char-counter loaded`)

$(document).ready(function() {
  console.log(`Ready Composer One`)
  // Select the id to assign the event listener 
  // Use "input" so it update on every char change
  $(".tweet-text").on("input", function () {
    // change the height of the text box (stretch)
    // $('.tweet-text')[0].scrollHeight;

    // Length is the value of #text-tweet chars
    let length = $(this).val().length;
    console.log($(this).val())

    // Grab the value of counter
    let counter = $(".counter");
    counter.val(140 - length);

    // Change the counter to red if
    // they are over the character limit
    console.log(length)
    if (length > 140) {
      counter.addClass("red");

    } else if (length < 141) {
      counter.removeClass("red");
      $('#error').slideUp(1000);
    } else if (length > 0) {
      $('#error').slideUp(1000);
    }
  })

  $(".tweet-text").on("submit", () => {
    if (length > 140) {
      return alert("Too many characters")
    } else if (length < 1 || length === null || length === "") {
      return alert("Please, write... something")
    }
  })
});
