import { describe, test, expect, vi } from 'vitest';
import { FilmsController } from './film.controller';
import { Repository } from '../repos/repository.type';
import { Request, Response, NextFunction } from 'express';
import { Film } from '@prisma/client';

describe('Given an instance of FilmsController', () => {
    const repoFilmsMock = {
        getAll: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    } as unknown as Repository<Film>;
    const controller = new FilmsController(repoFilmsMock);

    const req = {} as Request;
    const res = {
        json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    describe('When getAll is called', () => {
        test('then it should call repoFilms.getAll and return data', async () => {
            const mockFilms = [{ id: '1', title: 'Film 1' }];
            repoFilmsMock.getAll = vi.fn().mockResolvedValue(mockFilms);

            await controller.getAll(req, res, next);

            expect(repoFilmsMock.getAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                data: mockFilms,
                error: '',
            });
        });
    });

    describe('When getById is called', () => {
        test('then it should call repoFilms.getById and return data', async () => {
            const mockFilm = { id: '1', title: 'Film 1' };
            req.params = { id: '1' };
            repoFilmsMock.getById = vi.fn().mockResolvedValue(mockFilm);

            await controller.getById(req, res, next);

            expect(repoFilmsMock.getById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({
                data: [mockFilm],
                error: '',
            });
        });
    });

    describe('When post is called', () => {
        test('then it should call repoFilms.create and return the created film', async () => {
            const newFilm = [{ id: '1', title: 'New Film' }];
            req.body = newFilm;
            repoFilmsMock.create = vi.fn().mockResolvedValue(newFilm);
            await controller.post(req, res, next);

            expect(repoFilmsMock.create).toHaveBeenCalledWith(newFilm);
            expect(res.json).toHaveBeenCalledWith({
                data: [newFilm],
                error: '',
            });
        });
    });

    describe('When patch is called', () => {
        test('then it should call repoFilms.update and return the updated film', async () => {
            const updatedFilm = { title: 'Updated Film' };
            req.params = { id: '1' };
            req.body = updatedFilm;
            repoFilmsMock.update = vi.fn().mockResolvedValue(updatedFilm);

            await controller.patch(req, res, next);

            expect(repoFilmsMock.update).toHaveBeenCalledWith('1', updatedFilm);
            expect(res.json).toHaveBeenCalledWith({
                data: [updatedFilm],
                error: '',
            });
        });
    });

    describe('When delete is called', () => {
        test('then it should call repoFilms.delete and return the deleted film', async () => {
            const deletedFilm = { id: '1', title: 'Deleted Film' };
            req.params = { id: '1' };
            repoFilmsMock.delete = vi.fn().mockResolvedValue(deletedFilm);

            await controller.delete(req, res, next);

            expect(repoFilmsMock.delete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({
                data: [deletedFilm],
                error: '',
            });
        });
    });
});
