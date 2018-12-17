var Spotify = require('node-spotify-api')
var keys = require("./keys.js")
var chalk = require("./chalk.js")

function findTrack(input_song) {
    input_song = input_song || 'The Sign Ace Base'
    var spotify = new Spotify(keys.spotify)
    spotify.search({ type: 'track', query: input_song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].artists[0].name
        var song = data.tracks.items[0].name
        var track_info = data.tracks.items[0].track_number + " of " + data.tracks.items[0].album.total_tracks
        var album = data.tracks.items[0].album.name + " (Released: " + data.tracks.items[0].album.release_date + ")"
        var preview_url = data.tracks.items[0].preview_url
        var album_url = data.tracks.items[0].album.external_urls.spotify
        // Some songs don't have preview, like All The Small Things
        // will output album URL in that case
        var url = preview_url || album_url
        console.log(chalk.printGreen("Song Info:"))
        var logPrint =
            chalk.printCategory('Artist', artist) +
            chalk.printCategory('Album', album) +
            chalk.printCategory('Song', song) +
            chalk.printSubCategory("Track", track_info) +
            chalk.printCategory('URL', url)
        console.log(logPrint)
    });
}

module.exports = findTrack