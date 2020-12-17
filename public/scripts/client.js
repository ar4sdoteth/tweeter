/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
console.log(`client.js loaded`)

$(document).ready(function() {
  console.log(`Ready Client Document One`)
  // Loops through an array of tweets 
  // to createTweetElement
  const renderTweets = (tweetArray) => {
    for (let eachTweet of tweetArray) {
      console.log(`each tweet`, eachTweet)
      $tweetObj = createTweetElement(eachTweet);
    }
  }

  // Creates dynamic tweets via HTML Markup
  // to the #tweets-container id in index.html
  const createTweetElement = (tweetObj) => {
    let $tweet = $(` 
    <article class="border">
      <div>
        <header class="row">
          <p>${tweetObj.user.name}</p>
          <p class="userName">${tweetObj.user.handle}</p>
        </header>
          <p name="tweetBoxText" class="tweet-text">${tweetObj.content.text}</p>
        <footer class="timeDisplay">${tweetObj.created_at}</footer>
      </div>
    </article>`);
    $('#tweets-container').append($tweet);
  }

  // Use ajax to send form && prevent
  // page reload
  $("form").submit(function(event) {
    event.preventDefault();
    const targetValue = $(this).find("input").val();
    console.log(`target value`, targetValue)
    if (targetValue.length > 140) {
      return alert("Too many characters")
    } else if (targetValue < 1) {
      return alert("Please, write... something")
    } else {
      $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
      .then(console.log("AJAX workz"));
      // .catch
    }
  });

  // Use ajax to load the database
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
    .then((fetchTweets) => {
      console.log(`Got the tweets`, fetchTweets);
      renderTweets(fetchTweets)
    });
  }

  loadTweets();

});