import mongoose from "mongoose";
let urlDb;

if (process.env.NODE_ENV === 'DEV') {
    urlDb = 'mongodb://127.0.0.1:27017/quienPaLeer';
} else {
    urlDb = "mongodb+srv://admin:admin1234@cluster0.w44l4de.mongodb.net/quienPaLeer?retryWrites=true&w=majority";
}

console.log(urlDb)

const connection = mongoose.connect(urlDb)
    .then(() => console.log("Conexión a BD exitosa"))
    .catch((err) => console.log("Error en la conexión a BD"));


// Almacenar usuario en la BD
const saveUser = async (user) => {
    return new Promise((resolve, reject) => {
        user.save()
            .then(() => {
                // Se registra correctamente el usuario en la BD
                resolve(true);
            })
            .catch(() => {
                // Ha ocurrido un error en registrar el usuario en la BD
                reject(false);
            });
    });
};

const saveEvent = async (event) => {
    return new Promise((resolve, reject) => {
        event.save()
            .then(() => {
                // Se registra correctamente el evento en la BD
                resolve(true);
            })
            .catch(() => {
                // Ha ocurrido un error en registrar el evento en la BD
                reject(false);
            });
    });
};

const database = {
    saveUser,
    saveEvent
};

export default database;