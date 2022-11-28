import makeApp from '../../app.js';
import database from '../../database.js';
import request from 'supertest';
import User from '../../models/User.js';
import Donation from '../../models/Donation.js';
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
describe('tests on the donation path',()=>{

    describe ('Get /api/donation/',()=>{
        let response;
        beforeEach(async ()=>{
            response = await request(app).get('/api/donation/').send();
            
        });
        it('the path works',async ()=>{            
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('json');
        });
        it('the request returns an array',async ()=>{
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /api/donation/create',()=>{
        let token;
        const endpoint = '/api/donation/create';
        const newDonation = {
            name:"Libro test",
            title:"My test",
            author:"Test",
            editorial:"editorial test",
            image:"image test"
        }
        const newDonation2 = {
            name:"Libro test",
            title:"title test",
            image:"image test"
        }
        
        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeAll(async () => {
            await request(app).post('/api/auth/register').send(newUser);
            const response = await request(app).post('/api/auth/login').send(loginInput);
            token = response.body.token;
        });
        
        afterAll( async ()=>{
            await Donation.deleteMany({title:'My test'});
            await cleanDatabase();
        });

        it('the path work ',async ()=>{
            const response = await request(app).post(endpoint).send(newDonation).set('Cookie', [`access_token=${token}`]);          
            expect(response.status).toBe(201);
            expect(response.header['content-type']).toContain('json');
        });
        it('The request returns a json with all the attributes inserted', async ()=>{
            const response = await request(app).post(endpoint).send(newDonation).set('Cookie', [`access_token=${token}`]); 
            expect(response.body.name).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.author).toBeDefined();
            expect(response.body.editorial).toBeDefined();
            expect(response.body.image).toBeDefined();
        });
        it('The request return an error',async()=>{
            const response = await request(app).post(endpoint).send(newDonation2).set('Cookie', [`access_token=${token}`]);
            expect(response.status).toBe(500);
        });
    });  
})