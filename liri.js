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

// For OMDB
var request = require('request');

if (process.argv[2] == "my-tweets") {
    tweetit()
}
////// Inputs //////
function tweetit()
// When the user inputs my-tweets, it will run this:
{
    var params = { screen_name: 'karunashi' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("-----------------")
                console.log(tweets[i].created_at)
                console.log(tweets[i].text)
                console.log("-----------------")
            }
        } else {
            console.log(error)
        }
    });
    client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
  if (error) {
    console.log(error); // To ensure that my access token for "read-only" permissions is working.
  }
});
}

// When the user inputs spotify-this-song, it will run this:
if (process.argv[2] == "spotify-this-song" && !search == " ") {
    spotifySongSearch();
}

function spotifySongSearch() {
    spotifyNPM.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // For-loop to check and see if the artists array contains more than one object. If it does, it will print the first (if), if not, it will print the else statement. Used to check if there's singular or plural artists since there can be more than one artist.
        if (!search == " ") {

            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                if (data.tracks.items[0].artists.length > 1) {
                    console.log("Artist(s) Name: " + data.tracks.items[0].artists[i].name);
                } else {
                    console.log("There's only one artist.")
                    console.log("Artist Name: " + data.tracks.items[0].artists[i].name);
                }
            }
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Spotify Link: " + data.tracks.items[0].album.external_urls.spotify);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            // console.log(data.tracks.items[0]); JUST FOR CHECKING [DELETE LATER]
        }
    });
}

// If the variable search is undefined and the command for spotify is executed, it will run this:
if (process.argv[2] == "spotify-this-song" && search == undefined) {
    spotifyNoSong();
}

function spotifyNoSong() {
    spotifyNPM.search({ type: 'track', query: 'The Sign, Ace of Base' }, function(err, data) {
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Spotify Link: " + data.tracks.items[0].album.external_urls.spotify);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
    });
}

// If user inputs "movie this" and searches for a movie, it will show this:
if (process.argv[2] == "movie-this" && !search == " ") {
    movieSearch();
}

function movieSearch() {
    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&r=json", function(error, response, body) {

        if (!error) {
            console.log("Title of the Movie: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Movie Rating: " + JSON.parse(body).imdbRating + "/10");
            console.log("Movie was produced in: " + JSON.parse(body).Country);
            console.log("Primary Language of the film: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors/Actresses: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Source: " + JSON.parse(body).Ratings[1].Source);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        } else if (error) {
            console.log(error)
        }
    });
}

// If user inputs "movie this," and the search variable is undefined, it automatically show this by default:
if (process.argv[2] == "movie-this" && search == undefined) {
    movieNoSearch();
}

function movieNoSearch() {
    request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&r=json", function(error, response, body) {
        if (!error) {
            console.log("Title of the Movie: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Movie Rating: " + JSON.parse(body).imdbRating + "/10");
            console.log("Movie was produced in: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors/Actresses: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating2: " + JSON.parse(body).Ratings[1].Source);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        } else if (error) {
            console.log(error)
        }
    });
}

if (process.argv[2] == "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
    var splitData = data.split(",");
    // console.log(splitData); // Check to see what's split. 
    var inputOne = splitData[0];
    search = splitData[1];
    if (inputOne == "spotify-this-song") {
        spotifySongSearch(search); //spotifySongSearch function runs here
    } else if (inputOne == "my-tweets") {
        tweetit(); // tweetit function runs here (no process.argv[3])
    } else if (inputOne == "movie-this") {
        movieSearch(search); //movieSearch function runs here
    }
});
}


if (process.argv[2] == undefined) {
    console.log("\x1b[1m \x1b[37m", "Access denied. Invalid command. Please type " + '\x1b[33m' + " help" + "\x1b[1m \x1b[37m" + " for further assistance.")
}
if (process.argv[2] == "help") {
    console.log("You may type one of the following commands: " + "\n" + "\x1b[36m", "spotify-this-song (search query)" + "\n" + "\x1b[35m", "movie-this (search query)" + "\n" + "\x1b[32m", "do-what-it-says")
}
