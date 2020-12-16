console.log(`composer-char-counter loaded`)

$(() => {
  const $tweetText = $("#tweet-text"); 
  const update = () => {
    const chars = 140 - $tweetText.val().length;
    const $counter = $("#counter")
    $counter.text(chars)
  };
  $tweetText.on("keyup", update);
});