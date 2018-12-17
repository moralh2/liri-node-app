var axios = require("axios")
var keys = require("./keys.js")
var chalk = require("./chalk.js")

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
            chalk.printCategory('Title', title) +
            chalk.printCategory('Year', year) +
            chalk.printCategory('Ratings') +
            chalk.printSubCategory(ratings[0].Source, ratings[0].Value) +
            chalk.printSubCategory(ratings[1].Source, ratings[1].Value) +
            chalk.printCategory('Country', country) +
            chalk.printCategory('Language:', language) +
            chalk.printCategory('Plot', plot) +
            chalk.printCategory('Actors', actors)
        console.log(logPrint)
    })
}

module.exports = findMovie