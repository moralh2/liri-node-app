require("dotenv").config();

var keys = require("./keys.js")
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);


spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].name); 
    console.log(data.tracks.items[0].track_number); 
    console.log(data.tracks.items[0].album.name); 
    console.log(data.tracks.items[0].album.release_date); 
    console.log(data.tracks.items[0].artists[0].name); 




//   console.log(data.tracks.items[0].name); 
//   console.log(data.tracks.items[0].album); 
//   console.log(data.tracks.items[0].track_number); 
//   console.log(data.tracks.items[0]).artists.name; 
//   console.log(data.tracks.items[0]); 


});



// concert-this <artist/band name here>
// spotify-this-song
// movie-this
// do-what-it-says