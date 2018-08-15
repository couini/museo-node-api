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
    }

    public async GetArtists(req: Request, res: Response): Promise<void> {
        try {
            const artists = await Artist.find({}).exec();
            res.status(200).send(artists);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public GetArtist(req: Request, res: Response): void {

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