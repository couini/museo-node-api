import { Router, Request, Response, NextFunction } from 'express';
import Artist, {default as artist} from '../models/artist';

class ArtistRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetArtists(req: Request, res: Response): void {
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



    routes() {
        this.router.get('/artists', this.GetArtists);
    }
}

const artistRoutes = new ArtistRouter();
artistRoutes.routes();

export default artistRoutes.router;