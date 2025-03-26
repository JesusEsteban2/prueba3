import type { Repository } from './repository.type';
import { PrismaClient } from '@prisma/client';
import { Film } from '@prisma/client';

export class FilmPrismaRepo implements Repository<Film> {
    prisma: PrismaClient;
    constructor() {
        console.log('Instancite repo for films');
        this.prisma = new PrismaClient();
    }

    async getAll(): Promise<Film[]> {
        const rows = await this.prisma.film.findMany();
        console.log(rows);
        return rows;
    }

    async getById(id: string): Promise<Film> {
        const row = await this.prisma.film.findUniqueOrThrow({
            where: { id },
        });

        return row;
    }

    async create(data: Omit<Film, 'id'>): Promise<Film> {
        const row = await this.prisma.film.create({
            data,
        });
        return row;
    }

    async update(id: string, data: Partial<Omit<Film, 'id'>>): Promise<Film> {
        const row = await this.prisma.film.update({
            where: { id },
            data,
        });

        return row;
    }

    async delete(id: string): Promise<Film> {
        const row = await this.prisma.film.delete({
            where: { id },
        });
        return row;
    }
}
