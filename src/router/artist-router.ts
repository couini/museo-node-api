import { Router, Request, Response, NextFunction } from 'express';
import Artist from '../models/artist';

class ArtistRouter {
    router; Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetArtists(req: Request, res: Response): void {

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

// export