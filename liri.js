// Take keys from keys.js
var authentication = require("./keys.js");
// Ensure that it uses Twitter NPM.
var twitterNPM = require('twitter');
// Short form for keys being exported.
var twitKey = authentication.twitterKeys;
// Take all keys and implement for this run.
var client = new twitterNPM({
		consumer_key: twitKey.consumer_key,
		consumer_secret: twitKey.consumer_secret,
		access_token_key: twitKey.access_token_key,
		access_token_secret: twitKey.access_token_secret
	});


if (process.argv[2] == "my-tweets") {
	console.log("Test")
var params = {screen_name: 'karunashi', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[2]);
  }
  else {
  	console.log(error)
  }
});

}