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
        this.router.post('/', this.CreateArtists);
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

    public async CreateArtists(req: Request, res: Response): Promise<void> {

        try {

            const properties = req.body;
            const uid = await artistRouter.generateUid(25);

            const artist = new Artist({
                name: properties.name,
                firstname: properties.firstname,
                biography: properties.biography,
                birthplace: properties.birthplace,
                deathplace: properties.deathplace,
                birthdate: properties.birthdate,
                deathdate: properties.deathdate,
                picture: properties.picture,
                slug: properties.slug,
                uid: uid
            });

            await artist.save();

            res.status(200).send(artist);

        } catch (error) {
            res.status(500).send(error);
        }
    }

    public UpdateArtist(req: Request, res: Response): void {

    }

    public DeleteArtists(req: Request, res: Response): void {

    }

    private generateUid(length: number) {
        return new Promise((resolve, reject) => {
            const values = '0123456789';
            let uniqueId = '';
            for (let i = length; i > 0; --i) {
                uniqueId += values[Math.round(Math.random() * (values.length - 1))];
            }

            Artist.findOne({ 'data.uid': uniqueId }, (err, document) => {
                if (document) {
                    artistRouter.generateUid(15);
                } else {
                    resolve(uniqueId);
                }
            });
        });
    }
}

const artistRouter = new ArtistRouter();
artistRouter.routes();

export default artistRouter.router;