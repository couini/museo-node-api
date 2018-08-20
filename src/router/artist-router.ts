import { Router, Request, Response, NextFunction } from 'express';

import Artist from '../models/artist'
let ArtistController = require('../controllers/artist-controller');
import { getArtists, postArtist, getArtist, putArtist, deleteArtist } from "../controllers/artist-controller";

class ArtistRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', getArtists);
        this.router.get('/:slug', getArtist);
        this.router.post('/', postArtist);
        this.router.put('/:slug', putArtist);
        this.router.delete('/:slug', deleteArtist);
    }

    public async GetArtists(req: Request, res: Response): Promise<void> {
        try {
            const artists = await Artist.find({}).exec();
            res.status(200).send(artists);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetArtist(req: Request, res: Response): Promise<void> {
        try {
            const artist = await Artist.findOne({ slug: req.params.slug });
            res.send(artist);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async CreateArtist(req: Request, res: Response): Promise<void> {

        try {

            const properties = req.body;

            const artist = new Artist({
                name: properties.name,
                firstname: properties.firstname,
                biography: properties.biography,
                birthplace: properties.birthplace,
                deathplace: properties.deathplace,
                birthdate: properties.birthdate,
                deathdate: properties.deathdate,
                picture: properties.picture,
                slug: properties.slug
            });

            await artist.save();

            res.status(200).send(artist);

        } catch (error) {
            res.status(500).send(error);
        }
    }

    public UpdateArtist(req: Request, res: Response): void {

    }

    public async DeleteArtist(req: Request, res: Response): Promise<void> {
        try {
            const filter = {
                'slug': req.params.slug
            };

            const artist = await Artist.findOneAndRemove(filter);
            res.status(200).send(artist);

        } catch (e) {
            res.status(500).send(e);
        }
    }
}

const artistRouter = new ArtistRouter();
artistRouter.routes();

export default artistRouter.router;