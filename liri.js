require("dotenv").config();

var findTrack = require("./track.js")
var findMovie = require("./movie.js")
var findVenue = require("./venue.js")

var fs = require("fs");

var command = process.argv[2]
var inputForFunction = process.argv[3]

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
        default:
            console.log('ruh roh')
    }
}

function readFromFile() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var fileInputs = data.split(",");
        var command = fileInputs[0]
        var inputForFunction = fileInputs[1]
        runACommand(command, inputForFunction)
    })
}