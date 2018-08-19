import Artist from '../models/artist'

class ArtistController {

    /**
     * Get all artists
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     * @constructor
     */
    public async GetArtists(req, res) {
        await Artist.find({}, function(err, artists) {
            try {
                res.status(200).send(artists);
            } catch (e) {
                let errorMessage = e.message || e;
                res.status(500).send(errorMessage);
            }
        });
    }

    /**
     * Get artist by slug
     * 
     * @param req
     * @param res
     * @returns {Promise<void>}
     * @constructor
     */
    public async GetArtist(req, res) {
        await Artist.find({ slug: req.params.slug }, function(err, artist) {
            try {
                if (artist.length === 0) {
                    res.status(500).send({status: 'erreur', message: 'Artiste inexistant'});
                } else {
                    res.status(200).send(artist);
                }
            } catch (e) {
                res.status(500).send(e.error.message);
            }
        });
    }
}

export default new ArtistController();