import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';

import ArtistRouter from './router/artist-router'

class Server {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/museo';

    constructor() {
        this.app = express();

        // Enable CORS
        /*this.app.use(cors());*/

        this.mongoSetup();
        this.config();
        this.routes();
    }

    public config() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({limit:'5mb', type:'application/json'}));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Pass to next layer of middleware
            next();
        });
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Museo works !!'
            });
        });

        this.app.use('/api', router);
        this.app.use('/api/artists', ArtistRouter);
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