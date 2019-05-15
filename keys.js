console.log('this is loaded');


//exporting object spotify that has taken my id and secret id from .env
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}