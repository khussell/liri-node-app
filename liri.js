require("dotenv").config()

//accessing spotify npm
var Spotify = require('node-spotify-api')
//accessing keys.js (looking in current folder with ./)
var keys= require("./keys.js")
//access axios
var axios= require("axios")
//access moment
var moment= require("moment")

//using variable above to access spotify id's from keys.js
var spotify= new Spotify(keys.spotify)

var input1= process.argv[2]
var input2= "Blink-182"

var concertThis= function(input){
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function(response){
        for(var i=0; i< response.data.length; i++){
        var date= moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")

        console.log(`Venue: ${response.data[i].venue.name} \nLocation: ${response.data[i].venue.city},${response.data[i].venue.country} \nDate: ${date} \n ----------------------------------------`)
        }
    })

}

concertThis(input2)

var userCommand= function(input){
  switch(input){
    case 'concert-this':
      concertThis()
      break;
    case 'spotify-this-song':
      spotifyThisSong()
      break;
    case 'movie-this':
      movieThis()
      break;
    case 'do-what-it-says':
      doWhatItSays()
      break;
    default:
      console.log ("Liri does not know that.")
    }
}
