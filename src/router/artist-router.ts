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

    public GetArtists(req: Request, res: Response): void {
        /*res.json({
            message: 'Artists works !'
        });*/
        Artist.find({}, (err, artists) => {
           if (err) {
               const status = req.statusCode;
               res.json({
                   status,
                   err
               });
           }

           const status = req.statusCode;
           res.json({
               status,
               artists
           });
        });
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