import { createServer, Server } from 'node:http';
import { createApp } from './app.js';

const PORT = process.env.PORT_SEVER || 3000;

try {
    const server = createServer(createApp());
    server.listen(PORT);
    server.on('listening', () => listenManager(server));
} catch (err) {
    console.error('Server Error', err);
    process.exit(1);
}

const listenManager = (server: Server) => {
    const addr = server.address();
    if (addr === null) return;
    let bind: string;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `${addr.address}:${addr?.port}`;
    }
    if (!process.env.DEBUG) {
        console.log(`Server listening on ${bind}`);
    } else {
        console.log(`Server listening on ${bind}`);
    }
};
