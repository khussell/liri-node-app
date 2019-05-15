require("dotenv").config()

//accessing spotify npm
var Spotify = require('node-spotify-api')
//accessing keys.js (looking in current folder with ./)
var keys = require("./keys.js")
//access axios
var axios = require("axios")
//access moment
var moment = require("moment")
//access fs
var fs = require("fs")
//using variable above to access spotify id's from keys.js
var spotify = new Spotify(keys.spotify)

//variables for user inputs on command line
var input1 = process.argv[2]
var input2 = ""
//defining input2 by making sure to get user's multiple word inputs in command line
for (var i = 3; i < process.argv.length; i++) {
    input2 += process.argv[i] + " "
}

console.log(input2)
//object of functions that will run from switch via user's first input
//these functions will take user's second input as parameter
var commands = {

    concertThis: function (input) {
        //2nd input will be put in bandstown api queryURL and axios will retrieve data
        var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
        axios.get(queryURL).then(function (response) {
            //loop through data and console log info about where band is playing and log to log.txt
            for (var i = 0; i < response.data.length; i++) {
                //using moment to format the datetime
                var date = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")
               
                let text = `----------------------------------------\nVenue: ${response.data[i].venue.name} \nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.country} \nDate: ${date} \n----------------------------------------`

                console.log(text)
                fs.appendFile("log.txt", text, function (err) {
                    if (err) {
                        console.log(err)
                    } 
                })
            }
        })

    },

    spotifyThisSong: function (input) {
        if (input === "") {
            input = "The Sign"
        }
        spotify.search({ type: 'track', query: `${input}`, limit: 20 }, function (err, data) {
            //if err exists console log error
            if (err) {
                return console.log("Error: " + err)
            }
            //loop through each search result and log to log.text and console log needed data 
            for (var i = 0; i < data.tracks.items.length; i++) {

                let text = `----------------------------------------\nArtist(s): ${data.tracks.items[i].artists[0].name} \nSong: ${data.tracks.items[i].name}\nPreview link: ${data.tracks.items[i].album.external_urls.spotify}\nAlbum: ${data.tracks.items[i].album.name}\n----------------------------------------`
                console.log(text)
                fs.appendFile("log.txt", text, function (err) {
                    if (err) {
                        console.log(err)
                    } 
                })
            }
        })

    },

    movieThis: function (input) {
        //if input has no movie, we will default it to Mr. Nobody
        if (input === "") {
            input = "Mr. Nobody"
        }
        //url w/ trilogy api and added input to access data
        let queryURL = `http://www.omdbapi.com/?apikey=trilogy&t=${input}`
        //using axios to retrieve omdb api data
        axios.get(queryURL).then(function (response) {
            //formatting date to just year of release  
            let date = moment(response.data.Year, "DD MMM YYYY").format("YYYY")

            //appending all data to log.txt and console logging all data
            let text = `----------------------------------------\nTitle: ${response.data.Title} \nYear: ${date}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n----------------------------------------`
           
            console.log(text)
            fs.appendFile("log.txt", text, function (err) {
                if (err) {
                    console.log(err)
                } 
            })
        })
    },

    doWhatItSays: function () {
        //access file system to read file random.text
        fs.readFile("random.text", "utf8", function (error, data) {
            if (error) {
                return console.log("Error: " + error)
            }
            //formatting random.text data to update input1 and input2
            var dataSplit = data.split("")
            for (var i = 0; i < dataSplit.length; i++) {
                if (dataSplit[i] === '"') {
                    dataSplit.splice(i, 1)
                }
            }
            dataSplit = dataSplit.join("")
            dataSplit = dataSplit.split(",")
            input1 = dataSplit[0]
            input2 = dataSplit[1]
            //executing userCommand function with updated input1 and input2
            userCommand(input1)
        })
    }


}


var userCommand = function (input) {
    //userCommand will take input (which is input1 from user) and go through switch
    switch (input) {
        //with each case if user input1 from command line is this case it will go to whatever commands.function called
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
            commands.doWhatItSays()
            break;
        default:
            console.log("Liri does not know that.")
    }
}

//executing userCommand function with input1 as the argument
userCommand(input1)
