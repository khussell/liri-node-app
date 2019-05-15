require("dotenv").config()

//accessing spotify npm
var Spotify = require('node-spotify-api')
//accessing keys.js (looking in current folder with ./)
var keys = require("./keys.js")
//access axios
var axios = require("axios")
//access moment
var moment = require("moment")

//using variable above to access spotify id's from keys.js
var spotify = new Spotify(keys.spotify)

var input1 = process.argv[2]
var input2 = "All the Small Things"

//function that will run from switch of user's first input and will take user's second input as parameter
//2nd input will be put in bandsintown api queryURL and axios will retrieve data
//console logging info about where band is playing
var commands = {
    concertThis: function (input) {
        var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
        axios.get(queryURL).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")

                console.log(`Venue: ${response.data[i].venue.name} \nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.country} \nDate: ${date} \n ----------------------------------------`)
            }
        })

    },

    spotifyThisSong: function (input) {
        console.log(input)
        if (input === "") {
            input = "The Sign"
        }
        spotify.search({ type: 'track', query: `${input}`, limit: 20 }, function (err, data) {
            if (err) {
                return console.log("Error: " + err)
            }
            
            for (var i = 0; i < data.tracks.items.length; i++) {

                console.log(`Artist(s): ${data.tracks.items[i].artists[0].name} \nSong: ${data.tracks.items[i].name}\nPreview link: ${data.tracks.items[i].album.external_urls.spotify}\nAlbum: ${data.tracks.items[i].album.name}\n----------------------------------------`)
            }
        })

    },

    movieThis: function(input){

    }


}

commands.spotifyThisSong(input2)

var userCommand = function (input) {
    switch (input) {
        case 'concert-this':
            commands.concertThis(input2)
            break;
        case 'spotify-this-song':
            commands.spotifyThisSong(input2)
            break;
        case 'movie-this':
            commands.movieThis(input2)
            break;
        case 'do-what-it-says':
            commands.doWhatItSays(input2)
            break;
        default:
            console.log("Liri does not know that.")
    }
}
