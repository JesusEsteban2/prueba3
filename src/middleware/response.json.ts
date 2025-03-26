export class AppResponse<T> {
    constructor(
        public data: Partial<T>[],
        public error: string,
    ) {}
}
