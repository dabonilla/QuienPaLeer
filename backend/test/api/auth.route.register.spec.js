import request from 'supertest';
import makeApp from '../../app.js';
import database from '../../database.js';
import User from '../../models/User.js';
import { getAuth, deleteUser } from 'firebase/auth';

const app = makeApp(database);

describe('Pruebas sobre la funcionalidad de registro de usuario', () => {


    describe("POST /api/auth/register", () => {

        const endpoint = '/api/auth/register';

        const cleanDatabase = async () => {
            // Eliminar usuario de firebase y de la base de datos
            await User.deleteMany ({});
            await deleteUser(getAuth().currentUser);
        };

        const newUser = {
            email: "xiyega6103@deitada.com",
            password: "qweqwe123",
            name: "ivan",
            lastName: "morales",
            phone: "1234567"
        };
    

        describe("Dado un correo, contraseña, nombre, apellido y telefono correctos", () => {

            // Despues de ejecutar cada test se limpia la base de datos
            afterEach( () => cleanDatabase() );


            it('La ruta funciona -> Devuelve código 201 y header del contenido es tipo json', async () => {

                const response = await request(app).post(endpoint).send(newUser);
                expect(response.status).toBe(201);
                expect(response.headers['content-type']).toContain('json');

            });

            it('Se guarda correctamente el usuario en la BD', async () => {

                const response = await request(app).post(endpoint).send(newUser);
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toBe(`El usuario ${newUser.name} se ha creado sastifactoriamente`);

            });

            it('Se manda un correo de verficación al correo brindado', async() => {

                const response = await request(app).post(endpoint).send(newUser);
                expect(response.body.confirmationEmail).toBeDefined();
                expect(response.body.confirmationEmail).toBe(true);

            })

        });

        describe('Dado un correo ya registrado', () => {

            // Se ejecuta antes de cada test
            beforeEach(async() => {
                await request(app).post(endpoint).send(newUser);
            });

            // Se ejecuta despues de cada test
            afterEach(async() => {
                await cleanDatabase();
            });

            it('El servidor devuelve el código 500', async() => {
                const response = await request(app).post(endpoint).send(newUser);
                expect(response.statusCode).toBe(500);
            });

            it('Se devuele el mensaje: El correo electrónico EMAIL ya se encuentra en uso. Donde EMAIL es el correo ya registrado.', async() => {
                const response = await request(app).post(endpoint).send(newUser);
                expect(response.body.message).toBe(`El correo electrónico ${ newUser.email } ya se encuentra en uso`);
            });


        });


        describe('Dada una contraseña menor a 6 carácteres', () => {


            it('El servidor devuelve el código 500', async() => {
                const response = await request(app).post(endpoint).send({...newUser, password: "12345"});
                expect(response.statusCode).toBe(500);
            });

            it('Se devuele el mensaje: La contraseña debe de ser al menos de 6 carácteres', async() => {
                const response = await request(app).post(endpoint).send({...newUser, password: "12345"});
                expect(response.body.message).toBe('La contraseña debe de ser al menos de 6 carácteres');
            });


        });



        describe("Falta el correo o la contraseña o el nombre o el apellido o el telefono. O ningun dato es proporcionado.", () => {


            const badUsersInputs = 
            [
                {
                    // Falta el email
                    password: "qweqwe123",
                    name: "ivan",
                    lastName: "morales",
                    phone: "1234567"
                },
                {
                    // Falta la contraseña
                    email: "testUser@unal.edu.co",
                    name: "ivan",
                    lastName: "morales",
                    phone: "1234567"
                },
                {
                    // Falta el el nombre
                    email: "testUser@unal.edu.co",
                    password: "qweqwe123",
                    lastName: "morales",
                    phone: "1234567"
                },
                {
                    // Falta el apellido
                    email: "testUser@unal.edu.co",
                    password: "qweqwe123",
                    name: "ivan",
                    phone: "1234567"
                },
                {
                    // Falta el número telefónico
                    email: "testUser@unal.edu.co",
                    password: "qweqwe123",
                    name: "ivan",
                    lastName: "morales"
                }
            ];

            badUsersInputs.forEach( (badUserInput) => {

                it('No se guarda el usuario en la BD y el servidor devuelve el código 500', async() => {

                    const response = await request(app).post(endpoint).send(badUserInput);
                    expect(response.statusCode).toBe(500);


                });


            });

        });

    });

});