import { Router, Request, Response, NextFunction } from 'express';

import Artist from '../models/artist'

class ArtistRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', this.GetArtists);
        this.router.get('/:slug', this.GetArtist);
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

    public CreateArtists(req: Request, res: Response): void {

    }

    public UpdateArtist(req: Request, res: Response): void {

    }

    public DeleteArtists(req: Request, res: Response): void {

    }
}

const artistRouter = new ArtistRouter();
artistRouter.routes();

export default artistRouter.router;