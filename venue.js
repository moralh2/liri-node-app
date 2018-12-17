var axios = require("axios")
var moment = require('moment')
var chalk = require("./chalk.js")
var keys = require("./keys.js")

function findVenue(artists) {
    artists = artists || "Muse"
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=" + keys.bands.key 
    axios.get(queryUrl).then(function (response) {
        all_events = response.data
        console.log(chalk.printGreen("Events:"))
        for (var i = 0; i < all_events.length; i++) {
            var venue = all_events[i].venue.name + " "
            var location = all_events[i].venue.city + ", " + all_events[i].venue.country
            var date = moment(all_events[i].datetime).format("dddd, MMMM Do YYYY, h:mm A")
            var lineup = all_events[i].lineup.join(', ')
            var logPrint =
                chalk.printCategory('Lineup', lineup) +
                chalk.printCategory('Date', date) +
                chalk.printCategory('Venue', venue) +
                chalk.printCategory('Location:', location)
            console.log(chalk.printBlue("Event:"))
            console.log(logPrint)
        }
    })
}

module.exports = findVenue