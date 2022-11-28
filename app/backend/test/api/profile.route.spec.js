/* import request from 'supertest'
import makeApp from '../../app'
import database from '../../database'
import User from '../../models/User'

const app = makeApp(database)

const user = {
    _id: "0",
    name: "Luis",
    lastName: "Astaiza",
    email: "pdsistemico@gmail.com",
    phone: "3222222222",
    __v: 0
};

const newUser = {
    name: "Luis",
    lastName: "Astaiza",
    email: "pdsistemico@gmail.com",
    phone: "3222222222",
};

const cleanDatabase = async () => {
    // Eliminar usuario de firebase y de la base de datos
    await User.deleteMany({});
    await deleteUser(getAuth().currentUser);
};

describe('\nPruebas sobre la funcionalidad de perfil de usuario', () => {


    describe('GET /api/profile/view/userId', () => {

        const endpoint = '/api/profile/view';




        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(newUser);
            await request(app).post('/api/auth/login').send(loginInput);
            
        });

        // Eliminar el usuario creado para el testing del login
        afterEach(async () => {
            await cleanDatabase();
        });


        describe('Dado un userID existente', () => {



            it('La ruta funciona -> Devuelve código 201', async () => {

                const response = await request(app).get(`${endpoint}/puc6EsHdphdTqK1jav4qEasG49S2`);
                expect(response.statusCode).toBe(201);
                //expect(response.headers['content-type']).toContain('json');

            });

            it('Devuelve el usuario de la BD', async () => {
                const response = await request(app).get(endpoint);
                expect(response.body.User).toBe(user);
            });

            it('Devuelve un objeto con los eventos del usuario', async () => {
                const response = await request(app).get(endpoint);
                expect(response.body.events).toBeDefined();
            });

            it('Devuelve un objeto con las publicaciones de libros del usuario', async () => {
                const response = await request(app).get(endpoint);
                expect(response.body.books).toBeDefined();
            });

        });

        describe('Dado un userId no existente', () => {
            it('La ruta no funciona -> Devuelve código 501', async () => {

                const response = await request(app).get(`${endpoint}/0`);
                expect(response.statusCode).toBe(501);
                //expect(response.headers['content-type']).toContain('json');

            });
        })

    });

});*/