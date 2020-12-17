/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
console.log(`client.js loaded`)

// Temporary faux database
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  console.log(`Ready Client Document One`)
  // Loops through an array of tweets 
  // to createTweetElement
  const renderTweets = (tweetArray) => {
    for (let eachTweet of tweetArray) {
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
    $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
    .then(console.log("It works!"));
  });

  const $tweet = renderTweets(data);

});