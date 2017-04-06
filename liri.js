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
// For spotify and movie search.
var spotifyNPM = require('spotify');
var search = process.argv[3]

	////// Inputs //////

// When the user inputs my-tweets, it will run this:
if (process.argv[2] == "my-tweets") {
	console.log("Test")
var params = {screen_name: 'karunashi'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
    	console.log("-----------------")
    	console.log(tweets[i].created_at)
    	console.log(tweets[i].text)
    	console.log("-----------------")
    }
  }
  else {
  	console.log(error)
  }
});
}
// When the user inputs spotify-this-song, it will run this:
if (process.argv[2] == "spotify-this-song" && !search == " ") {
	spotifyNPM.search({ type: 'track', query: search }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    // For-loop to check and see if the artists array contains more than one object. If it does, it will print the first (if), if not, it will print the else statement. Used to check if there's singular or plural artists since there can be more than one artist.
	    if (!search == " ") {

	    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
	    	if (data.tracks.items[0].artists.length > 1) {
	    		console.log("Artist(s) Name: "+data.tracks.items[0].artists[i].name);
	    	}
	    	else {
	    		console.log("There's only one artist.")
	    		console.log("Artist Name: "+data.tracks.items[0].artists[i].name);
	    	}
	    }
	 	console.log("Song Name: "+data.tracks.items[0].name);
	 	console.log("Album Name: "+data.tracks.items[0].album.name);
	 	console.log("Spotify Link: "+data.tracks.items[0].album.external_urls.spotify);
	 	console.log("Preview Link: "+data.tracks.items[0].preview_url);
	 	// console.log(data.tracks.items[0]); JUST FOR CHECKING [DELETE LATER]
	}
	});
}
else {
spotifyNPM.search({ type: 'track', query: 'The Sign,  Ace of Base' }, function(err, data) {
	    console.log("Artist Name: "+data.tracks.items[0].artists[0].name);
	 	console.log("Song Name: "+data.tracks.items[0].name);
	 	console.log("Album Name: "+data.tracks.items[0].album.name);
	 	console.log("Spotify Link: "+data.tracks.items[0].album.external_urls.spotify);
	 	console.log("Preview Link: "+data.tracks.items[0].preview_url);
    // Do something with 'data' 
});
}

