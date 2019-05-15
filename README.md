# liri-node-app

**Disclaimer:**
To make this app work for you, you will need to clone it and then supply your own .env file. You will also need to install npm packages: node-spotify-api, moment, axios, and get access to OMDB api and Bands in Town API.

##What is this app used for?

This app is a siri-like machine that will give information on certain topics. The topics include:
*band concerts
*movies
*songs

##Example of user inputs into command line:

**node liri.js concert-this Muse**

*-This will print upcoming Muse concert names, locations, and dates*


**node liri.js movie-this Avatar**

*-This will print the movie's name, production year, actors, language, and other various data*


**node liri.js spotify-this-song All the small things**

*-This will print the song's name, artists, album, and a preview link*


**node liri.js do-what-it-says**

*-This will use information from a text file and give user a result*



**All info will be logged to the console and logged to a text file (log.txt)**



