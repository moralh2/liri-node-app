require("dotenv").config();
var findTrack = require("./track.js")
var findMovie = require("./movie.js")
var findVenue = require("./venue.js")

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

}