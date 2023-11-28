import database from './database.js';
import createApp from './app.js';
import fs from 'fs';
import https from 'https';

const options = {
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key')
};

const app = createApp(database);

const server = https.createServer(options, app);

server.listen(process.env.PORT || 5000, () => {
    console.log("Servidor backend funcionando");
    console.log(`https://127.0.0.1:5000`);
});