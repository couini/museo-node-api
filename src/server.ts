import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';

class Server {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/museo';

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
        this.routes();
    }

    public config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        // this.app.use('/api/artists', ArtistRouter);
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useMongoClient: true});

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Connection error : '));
        db.once('open', function () {
            console.log('Connection ok!');
        });
    }
}

export default new Server().app;