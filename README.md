# LIRI - liri-node-app

## Overview
This assignment used Node.js to run different packages to create a command-line interface (CLI) application, called LIRI. LIRI takes a command and input combination, and then, according to the command, it searches Spotify for a song, Bands in Town for concerts for a particular band or artist, and OMDB for a speicifc movie. 

## Node Packages
This app uses several Node.js packages:
* axios - for making API requests to Bands in Town and OMDB
* fs - to retrive commands from a text file instead of the command line
* node-spotify-api - to search for songs using the Spotify REST API
* moment - to format date strings
* chalk - to add styling to console output

## Set-up for the App
In order to use the app, you must have Node.js installed.

First, clone the repo, andt then run the following to install all of the dependencies:
```javascript
npm install
```
You will also need to set up your own `.env` file with the API keys needed for Spotify and OMDB:
```bash
# sample .env
SPOTIFY_ID=<key>
SPOTIFY_SECRET=<secret>
```

## Using the App
To use the app, you must use node to call on the `liri.js` file, and then provide a `command` and an `input`. The commands are:
* `spotify-this-song` - You must provide an input for the song search
* `movie-this` - You must provide an input for the movie search
* `concert-this` - You must provide an input for the venue search
* `do-what-it-says` - When this command executes, the app reads the contents of file `random.txt`; the file will have a `command` and an `input`, matching one of the previous cases (for a song, movie or venue search).

## Examples of the App in use

### Searching for Concerts
![Alt Text](gifs/events.gif)

### Searching for a Song
![Alt Text](gifs/track.gif)

### Searching for a Movie
![Alt Text](gifs/movie.gif)
