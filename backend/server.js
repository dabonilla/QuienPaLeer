import database from './database.js';
import createApp from './app.js';

const app = createApp(database);

app.listen(process.env.PORT || 5000, () => {
    console.log("Servidor backend funcionando");
    console.log(`http://127.0.0.1:5000`);
});