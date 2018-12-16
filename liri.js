require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api')
var axios = require("axios")
var moment = require('moment')


var inputs = process.argv
var command = inputs[2]

switch (command) {
    case 'spotify-this-song':
        findTrack()
        break;
    case 'movie-this':
        findMovie()
        break;
    case 'concert-this':
        findVenue()
        break;
    default:
        console.log('ruh roh')
}

function findTrack() {
    var spotify = new Spotify(keys.spotify)
    var input_song = inputs[3]
    spotify.search({ type: 'track', query: input_song }, function (err, data) {
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
            "Album: " + album + "\n" +
            "Song: " + song + " " + track_info + "\n" +
            "URL: " + url
        )
    });
}

function findMovie() {
    var movieName = inputs[3]
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + keys.omdb.key
    axios.get(queryUrl).then(function (response) {
        var title = response.data.Title
        var year = response.data.Year
        var ratings = response.data.Ratings
        var imdb = ratings[0].Source + " Rating: " + ratings[0].Value
        var rts = ratings[1].Source + " Rating: " + ratings[1].Value
        var country = response.data.Country
        var language = response.data.Language
        var plot = response.data.Plot
        var actors = response.data.Actors
        console.log(
            "Title: " + title + "\n" +
            "Year: " + year + "\n" +
            "Ratings: " + "\n" +
            "   " + imdb + "\n" +
            "   " + rts + "\n" +
            "Country or Countries: " + country + "\n" +
            "Language(s): " + language + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors + "\n"
        )
    })
}

function findVenue() {
    var artists = inputs[3]
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        all_events = response.data
        for (i = 0; i < all_events.length; i++) {
            var venue = all_events[i].venue.name + " "
            var location = "(" + all_events[i].venue.city + ", " + all_events[i].venue.country + ")"
            var date = moment(all_events.datetime).format() 
            // var lineup = all_events.lineup.join()
            console.log(
                // "Lineup: " + lineup + "\n" +
                "Date: " + date + "\n" +
                "Venue: " + venue + "\n" +
                "Location: " + location 
            )
        }
    })
}





// concert-this <artist/band name here>
// spotify-this-song
// movie-this
// do-what-it-says