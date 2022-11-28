import request from 'supertest';
import makeApp from '../../app.js';
import database from '../../database.js';
import User from '../../models/User.js';
import { getAuth, deleteUser } from 'firebase/auth';



const app = makeApp(database);


const newUser = {
    email: "testUser@unal.edu.co",
    password: "qweqwe123",
    name: "ivan",
    lastName: "morales",
    phone: "1234567"
};

const loginInput = {
    email: "testUser@unal.edu.co",
    password: "qweqwe123"
};

const cleanDatabase = async () => {
    // Eliminar usuario de firebase y de la base de datos
    await User.deleteMany({});
    await deleteUser(getAuth().currentUser);
};

describe('\nPruebas sobre la funcionalidad de login de usuario', () => {


    describe('POST /api/auth/login', () => {

        const endpoint = '/api/auth/login';




        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(newUser);
        });

        // Eliminar el usuario creado para el testing del login
        afterEach(async () => {
            await cleanDatabase();
        });


        describe('Dado un correo y una contraseña correctos', () => {



            it('La ruta funciona -> Devuelve código 200 y header del contenido es tipo json', async () => {

                const response = await request(app).post(endpoint).send(loginInput);
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toContain('json');

            });

            it('Devuelve el mensaje: El login se ha compleado sastifactoriamente', async () => {

                const response = await request(app).post(endpoint).send(loginInput);
                expect(response.body.message).toBe('El login se ha compleado sastifactoriamente');

            });

            it('Devuelve el token del usuario', async () => {
                const response = await request(app).post(endpoint).send(loginInput);
                expect(response.body.token).toBeDefined();
            });

            it('Guarda en una cookie el token JWT generado', async () => {
                const response = await request(app).post(endpoint).send(loginInput);
                expect(response.headers['set-cookie'][0]).toBeDefined();

            });

        });


        describe('Dado un correo no registrado', () => {

            const badInputLogin = { email: "noregistrado@correo.com", password: "qweqwe123" };


            it('Devuelve el código 401', async () => {
                const response = await request(app).post(endpoint).send(badInputLogin);
                expect(response.statusCode).toBe(401);
            });

            it('Devuelve el mensaje: El correo EMAIL NO se encuentra registrado. Donde EMAIl es el correo no registrado', async () => {
                const response = await request(app).post(endpoint).send(badInputLogin);
                expect(response.body.message).toBe(`El correo ${badInputLogin.email} NO se encuentra registrado`);
            });


        });


        describe('Dado un correo registrado y una contraseña incorrecta', () => {

            it('Devuelve el código 401', async () => {

                const response = await request(app).post(endpoint).send({ ...loginInput, password: "anotherpassword" });
                expect(response.statusCode).toBe(401);


            });

            it('Devuelve el mensaje: La contraseña es incorrecta', async () => {

                const response = await request(app).post(endpoint).send({ ...loginInput, password: "anotherpassword" });
                expect(response.body.message).toBe('La contraseña es incorrecta');

            });


        });

    });

    describe('GET /api/auth/logout', () => {


        const endpoint = '/api/auth/logout';



        describe('Un usuario logueado intenta cerrar sesión', () => {

            let token;

            // Para realizar el testing es necesario registrar, loguear y setear el token
            beforeEach(async () => {
                await request(app).post('/api/auth/register').send(newUser);
                const response = await request(app).post('/api/auth/login').send(loginInput);
                token = response.body.token;
            });

            // Limpiar BD y Firebase despues de cada test
            afterEach(async () => {
                await cleanDatabase();
            });


            it('La ruta sirve -> Devuelve código 200', async () => {
                const response = await request(app).get(endpoint).set('Cookie', [`access_token=${token}`]);
                expect(response.statusCode).toBe(200);

            });

            it('Devuelve el mensaje: Se ha cerrado sesión correctamente', async () => {
                const response = await request(app).get(endpoint).set('Cookie', [`access_token=${token}`]);
                expect(response.body.message).toBe('Se ha cerrado sesión correctamente');
            });

        });


        describe('Un usuario que no esta logueado intenta cerrar sesión', () => {


            it('Devuelve el codigo 401', async () => {

                const response = await request(app).get(endpoint);
                expect(response.statusCode).toBe(401);

            });


        });

    });


});