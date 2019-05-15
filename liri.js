require("dotenv").config()

//accessing keys.js
var keys= require("./keys.js")

//using variable above to access spotify id's from keys.js
var spotify= new spotify(keys.spotify)
