require("dotenv").config();
var keys = require("./keys.js")
var findTrack = require("./track.js")
var chalk = require("./chalk.js")

// var Spotify = require('node-spotify-api')

var axios = require("axios")
var moment = require('moment')
var fs = require("fs");


var inputs = process.argv
var command = inputs[2]
var inputForFunction = inputs[3]

runACommand(command, inputForFunction)

function runACommand(command, input) {
    switch (command) {
        case 'spotify-this-song':
            findTrack(input)
            break;
        case 'movie-this':
            findMovie(input)
            break;
        case 'concert-this':
            findVenue(input)
            break;
        case 'do-what-it-says':
            readFromFile()
            break;
        default:
            console.log('ruh roh')
    }
}

// function findTrack(input_song) {
//     input_song = input_song || 'The Sign Ace Base'
//     var spotify = new Spotify(keys.spotify)
//     spotify.search({ type: 'track', query: input_song }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }
//         var artist = data.tracks.items[0].artists[0].name
//         var song = data.tracks.items[0].name
//         var track_info = "(Track " + data.tracks.items[0].track_number + " of " + data.tracks.items[0].album.total_tracks + ")"
//         var album = data.tracks.items[0].album.name + " (Released: " + data.tracks.items[0].album.release_date + ")"
//         var preview_url = data.tracks.items[0].preview_url
//         var album_url = data.tracks.items[0].album.external_urls.spotify
//         // Some songs don't have preview, like All The Small Things
//         // will output album URL in that case
//         var url = preview_url || album_url
//         console.log(chalk.printGreen("Song Info:"))
//         var logPrint = 
//             printCategory('Artist', artist) +
//             printCategory('Album', album) + 
//             printCategory('Song', song) +
//             printSubCategory("Track", track_info) +
//             printCategory('URL', url)
//         console.log(logPrint)
//     });
// }

function findMovie(movieName) {
    movieName = movieName || "Mr. Nobody"
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + keys.omdb.key
    axios.get(queryUrl).then(function (response) {
        var title = response.data.Title
        var year = response.data.Year
        var ratings = response.data.Ratings
        var country = response.data.Country
        var language = response.data.Language
        var plot = response.data.Plot
        var actors = response.data.Actors
        console.log(chalk.printGreen("Movie Info:"))
        var logPrint = 
            printCategory('Title', title) +
            printCategory('Year', year) + 
            printCategory('Ratings') +
            printSubCategory(ratings[0].Source, ratings[0].Value) +
            printSubCategory(ratings[1].Source, ratings[1].Value) +
            printCategory('Country', country) +
            printCategory('Language:', language) +
            printCategory('Plot', plot) +
            printCategory('Actors', actors)
        console.log(logPrint)
    })
}

function findVenue(artists) {
    artists = artists || "Muse"
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        all_events = response.data
        console.log(chalk.printGreen("Events:"))
        for (var i = 0; i < all_events.length; i++) {
            var venue = all_events[i].venue.name + " "
            var location = all_events[i].venue.city + ", " + all_events[i].venue.country
            var date = moment(all_events[i].datetime).format("dddd, MMMM Do YYYY, h:mm A")
            var lineup = all_events[i].lineup.join(', ')
            var logPrint = 
                printCategory('Lineup', lineup) +
                printCategory('Date', date) + 
                printCategory('Venue', venue) +
                printCategory('Location:', location)
            console.log(printBlue("Event:"))
            console.log(logPrint)
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

        if (command == 'spotify-this-song') {
            findTrack(inputForFunction)
        }
        else if (command == 'movie-this') {
            findMovie(inputForFunction)
        }
        else if (command == 'concert-this') {
            findVenue(inputForFunction)
        }
        else {
            console.log('ruh roh 2')
        }
    })


    // var command
    // var inputForFunction
    // var data
    // try {  
    //     data = fs.readFileSync('random.txt', 'utf8');
    //     console.log(data);    
    // } catch(e) {
    //     console.log('Error:', e.stack);
    // }

    // var file_inputs = data.split(",");
    // command = file_inputs[0]
    // inputForFunction = file_inputs[1]

    // runACommand(command, inputForFunction)


    // fs.readFile("random.txt", "utf8", function(err, data) {
        // if (err) {
            // return console.log(err);
        // }
        // console.log(data)
    //     var file_inputs = data.split(",");
    //     command = file_inputs[0]
    //     inputForFunction = file_inputs[1]
    // })


}

function readFile(file) {
    try {  
        data = fs.readFileSync(file, 'utf8');
        return data 
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

