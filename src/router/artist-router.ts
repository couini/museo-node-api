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
}

const artistRouter = new ArtistRouter();
artistRouter.routes();

export default artistRouter.router;