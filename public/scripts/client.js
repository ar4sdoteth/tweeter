/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
console.log(`client.js loaded`)

$(document).ready(function() {
  console.log(`Ready Client Document One`)
  
  // Filtering text for XSS prevention
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
          <p name="tweetBoxText" class="tweet-text">${escape(tweetObj.content.text)}</p>
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
    // if blah blah blah slide down error
    
    if (targetValue.length > 140) {
      $('#error').slideDown();
      $('#error').html("🤐 There is such a thing as *over-sharing*. Dial it back a bit.");

    } else if (targetValue < 1) {
      // return alert("Please, write... something")
      $('#error').slideDown();
      $('#error').html("Please, write... something");

    } else {
      $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
      .then(console.log("AJAX post tweet"))
      .then(loadTweets())
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