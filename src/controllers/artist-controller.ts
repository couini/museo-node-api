import Artist from '../models/artist'

let ArtistController = {

    // Get all artists
    GetArtists: function(req, res){
        Artist.find({}, function(err, artists){
            if (err) {
                res.json({status: false, error: "Something went wrong"});
                return;
            }
            res.status(200).send(artists);
        });
    },
};

export default ArtistController;