require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');

var inputs = process.argv
var command = inputs[2]

switch(command) {
    case 'spotify-this-song':
      findTrack()
      break;
    // case y:
    //   code block
    //   break;
    // default:
    //   code block
  }

function findTrack() {
    var spotify = new Spotify(keys.spotify)
    var input_song = inputs[3]
    spotify.search({ type: 'track', query: input_song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].artists[0].name
        var song = data.tracks.items[0].name
        var track_info = "(Track " + data.tracks.items[0].track_number + " of " + data.tracks.items[0].album.total_tracks + ")"
        var album = data.tracks.items[0].album.name + " (Released: " + data.tracks.items[0].album.release_date + ")"
        var preview_url = data.tracks.items[0].preview_url
        var album_url = data.tracks.items[0].album.external_urls.spotify
        // Some songs don't have preview, like All The Small Things
        // will output album URL in that case
        var url = preview_url || album_url
        console.log(
            "Artist: " + artist + "\n" + 
            "Album: " + album+ "\n" +
            "Song: " + song + " " + track_info + "\n" + 
            "URL: " + url
        )
    });
}





// concert-this <artist/band name here>
// spotify-this-song
// movie-this
// do-what-it-says