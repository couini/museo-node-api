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
}

export default new ArtistController();