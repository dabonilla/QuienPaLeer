import makeApp from '../../app.js';
import database from '../../database.js';
import request from 'supertest';
import User from '../../models/User.js';
import book from '../../models/Book.js';
import { getAuth, deleteUser } from 'firebase/auth';
const app = makeApp(database);
const cleanDatabase = async () => {
    // Eliminar usuario de firebase y de la base de datos
    await User.deleteMany({});
    await deleteUser(getAuth().currentUser);
};
const loginInput = {
    email: "testUser@unal.edu.co",
    password: "qweqwe123"
};
const newUser = {
    email: "testUser@unal.edu.co",
    password: "qweqwe123",
    name: "ivan",
    lastName: "morales",
    phone: "1234567"
};

describe('Testing api publication',()=>{
    describe('GET /api/getWithUsers ',()=>{
        let response;
        beforeEach(async ()=>{
            response = await request(app).get('/api/book/getWithUsers').send();
            
        });
        it('the path works',async ()=>{            
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });
        it('the request returns an array',async ()=>{
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    describe('POST /api/book/create',()=>{
        const endpoint = '/api/auth/login';

        
        const newBook ={
            name:'00',
            title:'Mi test',
            author:"Test-book",
            editorial:"test",
            year:"2000",
            price:'1233'
        }
        const newBook2 ={
            title:'Mi test',
            editorial:"test",
            year:"2000",
            price:'1233'
        }
        let token;
        afterAll( async ()=>{
            await book.deleteMany({name:'00'});
        });

        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(newUser);
                const response = await request(app).post('/api/auth/login').send(loginInput);
                token = response.body.token;
        });

        // Eliminar el usuario creado para el testing del login
        afterEach(async () => {
            await cleanDatabase();
        });

        it('the path work ',async ()=>{
             const response = await request(app).post('/api/book/create').send(newBook).set('Cookie', [`access_token=${token}`]);
            
             expect(response.status).toBe(201);
             expect(response.header['content-type']).toContain('json');
         });

        
        it('The request returns a json with all the attributes inserted', async ()=>{
            const response = await request(app).post('/api/book/create').send(newBook);
            expect(response.body.name).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.author).toBeDefined();
            expect(response.body.editorial).toBeDefined();
            expect(response.body.year).toBeDefined();
            expect(response.body.price).toBeDefined();
        });
        it('The request return an error',async()=>{
            const response = await request(app).post('/api/book/create').send(newBook2).set('Cookie', [`access_token=${token}`]);
            expect(response.status).toBe(500);
        });
    })
})