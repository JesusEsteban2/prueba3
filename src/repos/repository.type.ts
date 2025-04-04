// Creamos una interfaz ODM genérica
// que recibe el nombre de la colección
// como el conjunto de datos que se va a leer y escribir
// del conjunto total de datos

export interface Repository<T> {
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T>;
    create: (data: Omit<T, 'id'>) => Promise<T>;
    update: (id: string, data: Partial<Omit<T, 'id'>>) => Promise<T>;
    delete: (id: string) => Promise<T>;
}

export interface UserRepo<T> {
    register: (data: T) => Promise<T>;
    login: (email: string, pass: string) => Promise<T>;
}
