require("dotenv").config();
var keys = require("./keys.js")

var inputs = process.argv

var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);

console.log(inputs)




spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var artist = data.tracks.items[0].artists[0].name
    var song = data.tracks.items[0].name
    var track_info = "(Track " + data.tracks.items[0].track_number + " of " + data.tracks.items[0].album.total_tracks + ")"
    var album = data.tracks.items[0].album.name + " (Released: " + data.tracks.items[0].album.release_date + ")"
    var url = data.tracks.items[0].href
    

    console.log(
        "Artist: " + artist + "\n" + 
        "Album: " + album+ "\n" +
        "Song: " + song + " " + track_info + "\n" + 
        "URL: " + url
    )

});



// concert-this <artist/band name here>
// spotify-this-song
// movie-this
// do-what-it-says