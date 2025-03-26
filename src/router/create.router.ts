import { Router } from 'express';
import { FilmsController } from '../controllers/film.controller.js';
import { FilmPrismaRepo } from '../repos/films.repository.js';
//import { AuthInterceptor } from '../middleware/auth.interceptor.js';
//import { Role } from '@prisma/client';
//import { UserRepository } from '../repos/users.repo.js';
//import { UsersController } from '../controllers/users.controller.js';

//const auth = new AuthInterceptor(reviewRepo);

const filmRepo = new FilmPrismaRepo();
const filmsControl = new FilmsController(filmRepo);

// const userRepo: UserRepository = new UserRepository();
// const userController = new UsersController(userRepo);

export class CreateRouter {
    constructor() {}

    createFilmRouter() {
        console.log('Creating Film Router');
        const filmsRouter = Router();

        // getAll
        filmsRouter.get('/', filmsControl.getAll.bind(filmsControl));
        // getById
        filmsRouter.get('/:id', filmsControl.getById.bind(filmsControl));
        // add film
        filmsRouter.post('/', filmsControl.post.bind(filmsControl));
        // modify by id
        filmsRouter.patch('/:id', filmsControl.patch.bind(filmsControl));
        //delete
        filmsRouter.delete('/:id', filmsControl.delete.bind(filmsControl));

        return filmsRouter;
    }
}
