require("dotenv").config();
var keys = require("./keys.js")

var Spotify = require('node-spotify-api')
var axios = require("axios")
var moment = require('moment')
var fs = require("fs");
const chalk = require('chalk');
const printStyleKey = chalk.bgBlue.black
const printStyleValue = chalk.yellow.underline.bold

var inputs = process.argv
var command = inputs[2]
var inputForFunction = inputs[3]

switch (command) {
    case 'spotify-this-song':
        findTrack(inputForFunction)
        break;
    case 'movie-this':
        findMovie(inputForFunction)
        break;
    case 'concert-this':
        findVenue(inputForFunction)
        break;
    case 'do-what-it-says':
        readFromFile()
        break;
    default:
        console.log('ruh roh')
}

function findTrack(input_song) {
    var spotify = new Spotify(keys.spotify)
    // var input_song = inputs[3]
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
        console.log("---")
        console.log("Song Info:")
        console.log(
            "Artist: " + artist + "\n" +
            "Album: " + album + "\n" +
            "Song: " + song + " " + track_info + "\n" +
            "URL: " + url
        )
    });
}

function findMovie(movieName) {
    // var movieName = inputs[3]
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + keys.omdb.key
    axios.get(queryUrl).then(function (response) {
        // var movieObj = {}
        // movieObj["Title"] = response.data.Title
        // movieObj["Year"] = response.data.Year
        // var ratings = response.data.Ratings
        // movieObj["Ratings"] = {}
        // movieObj["Ratings"][ratings[0].Source] = ratings[0].Value
        // movieObj["Ratings"][ratings[1].Source] = ratings[1].Value
        // movieObj["Country"] = response.data.Country
        // movieObj["Language"] = response.data.Language
        // movieObj["Plot"] = response.data.Plot
        // movieObj["Actors"] = response.data.Actors



        // console.log(response.data)
        var title = response.data.Title
        var year = response.data.Year
        var ratings = response.data.Ratings
        var imdb = ratings[0].Source + " Rating: " + ratings[0].Value
        var rts = ratings[1].Source + " Rating: " + ratings[1].Value
        var country = response.data.Country
        var language = response.data.Language
        var plot = response.data.Plot
        var actors = response.data.Actors
        console.log(chalk.yellow('Hello world!'));

        console.log(printStyleKey("Hola Hola"))
        console.log(printStyleValue("Hola Hola"))

        console.log("---")
        console.log("Movie Info:")
        console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
        var logPrint = 
            "%c Title: " + title + "\n" +
            "Year: " + year + "\n" +
            "Ratings: " + "\n" +
            "   " + imdb + "\n" +
            "   " + rts + "\n" +
            "Country or Countries: " + country + "\n" +
            "Language(s): " + language + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors + "\n"
        console.log(logPrint, 'background: #222; color: #bada55')
        

        // console.log(movieObj)
        // console.log(response.data) 
        // var jsonPretty = JSON.stringify(movieObj,null,4)
        // console.log(jsonPretty)
    })
}

function findVenue(artists) {
    // var artists = inputs[3]
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        all_events = response.data
        console.log("---")
        console.log("Events:")
        for (i = 0; i < all_events.length; i++) {
            var venue = all_events[i].venue.name + " "
            var location = all_events[i].venue.city + ", " + all_events[i].venue.country
            var date = moment(all_events[i].datetime).format("dddd, MMMM Do YYYY, h:mm A")
            var lineup = all_events[i].lineup.join(', ')
            console.log(
                "---" + "\n" +
                "Lineup: " + lineup + "\n" +
                "Date: " + date + "\n" +
                "Venue: " + venue + "\n" +
                "Location: " + location 
            )
        }
    })
}

function readFromFile() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var file_inputs = data.split(",");
        var command = file_inputs[0]
        var inputForFunction = file_inputs[1]

        switch (command) {
            case 'spotify-this-song':
            console.log("AAAAA")
                findTrack(inputForFunction)
                break;
            case 'movie-this':
                findMovie(inputForFunction)
                break;
            case 'concert-this':
                findVenue(inputForFunction)
                break;
            default:
                console.log('ruh roh')
        }

    })
    // console.log(file_inputs)

    // var command = file_inputs[0]
    // var inputForFunction = file_inputs[1]
    // console.log(command)

    
}


// concert-this <artist/band name here>
// spotify-this-song
// movie-this
// do-what-it-says