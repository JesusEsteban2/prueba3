import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CreateRouter } from './router/create.router.js';
import { ErrorManager } from './errors/error.manager.js';

export const createApp = () => {
    console.log('Iniciando App...');

    const app = express();
    const errorManager = new ErrorManager();
    const publicPath = resolve('public');

    app.disable('x-powered-by');

    console.log('Registering Middleware...');
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(publicPath));

    /* App Routes */
    console.log('Creating routes...');
    const createRouter = new CreateRouter();
    // User
    // app.use('/api/users', createRouter.createUsersRouter());
    // Film
    app.use('/api/films', createRouter.createFilmRouter());

    // Not found & not method
    app.get('*', errorManager.notFoundController.bind(errorManager));
    app.use('*', errorManager.notMethodController.bind(errorManager));

    app.use(errorManager.errorController.bind(errorManager));

    return app;
};
