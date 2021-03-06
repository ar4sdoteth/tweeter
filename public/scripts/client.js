/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {


  // Event handler to initiate tweet
  $('#start-tweet').click(function() {

    $('textarea').focus();

  });

  // Hide the error display on load
  $('#error').slideUp(0);

  // Filtering text for XSS prevention
  const escape =  function(str) {

    let div = document.createElement('div');

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
  };

  // Loops through an array of tweets
  // to createTweetElement
  const renderTweets = (tweetArray) => {

    $('#tweets-container').empty()

    for (let eachTweet of tweetArray) {

      $tweetObj = createTweetElement(eachTweet);

    }
  };

  // Creates dynamic tweets via HTML Markup
  // to the #tweets-container id in index.html
  const createTweetElement = (tweetObj) => {

    const avatar = "far fa-meh fa-2x";
    const tweetTime = moment(tweetObj.created_at).fromNow(true);

    let $tweet = $(` 
    <article class="border">
      <div>
        <header class="row">
        <div class="tweet-header">
          <i class="${escape(avatar)}"></i>
          <p class="tweet-header">${escape(tweetObj.user.name)}</p>
        </div>
        <div>
          <p class="userName">${escape(tweetObj.user.handle)}</p>
        </div>
        </header>
          <p name="tweetBoxText" class="tweet-text">${escape(tweetObj.content.text)}</p>
        <footer class="tweet-footer">
          <div>
            <p class="timeDisplay">${tweetTime}</p>
          </div>
          <div class="icons">
            <i class="far fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </div>
    </article>`);
    $('#tweets-container').prepend($tweet);
  };

  // Use ajax to send form && prevent
  // page reload
  $("form").submit(function(event) {

    event.preventDefault();

    const targetValue = $(this).find("textarea").val();
    
    // Error prompts
    if (targetValue.length > 140) {
      $('#error').slideDown();
      $('#error').html(`<i class="far fa-meh fa-1x">  Talk less. Say more.</i><i class="far fa-meh fa-1x"></i>`);      

    } else if (targetValue < 1) {
      $('#error').slideDown();
      $('#error').html(`<i class="far fa-meh fa-1x">  Say something...</i><i class="far fa-meh fa-1x"></i>`);

    } else {
      $.ajax({ type: "POST", url: "/tweets", data: $(this).serialize() })
        .then(console.log("AJAX post tweet"))
        .then(loadTweets());
    }
  });

  // Use ajax to load the database
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
      .then((fetchTweets) => {
        console.log(`Got the tweets`, fetchTweets);
        renderTweets(fetchTweets);
      });
  };

  loadTweets();

});