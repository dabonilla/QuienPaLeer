import makeApp from '../../app.js';
import database from '../../database.js';
import request from 'supertest';
import User from '../../models/User.js';
import swap from '../../models/Swap.js';
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
describe('tests on the swap path',()=>{
    describe('POST /api/swap/create',()=>{
        let token;
        const newSwap ={
            title:'My test',
            author:"Test",
            description:'description test',
            interest:"test",
            image:'image test'
        }
        const newSwap2 ={
            title:'My test',
            description:'description test',
            image:'image test'
        }
        
        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(newUser);
            const response = await request(app).post('/api/auth/login').send(loginInput);
            token = response.body.token;
        });
        
        afterAll( async ()=>{
            await swap.deleteMany({title:'My test'});
        });
        // Eliminar el usuario creado para el testing del login
        afterEach(async () => {
            await cleanDatabase();
        });
        it('the path work ',async ()=>{
            const response = await request(app).post('/api/swap/create').send(newSwap).set('Cookie', [`access_token=${token}`]);          
            expect(response.status).toBe(201);
            expect(response.header['content-type']).toContain('json');
        });
        it('The request returns a json with all the attributes inserted', async ()=>{
            const response = await request(app).post('/api/swap/create').send(newSwap).set('Cookie', [`access_token=${token}`]); 
            expect(response.body.title).toBeDefined();
            expect(response.body.author).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.interest).toBeDefined();
            expect(response.body.image).toBeDefined();
        });
        it('The request return an error',async()=>{
            const response = await request(app).post('/api/swap/create').send(newSwap2).set('Cookie', [`access_token=${token}`]);
            expect(response.status).toBe(500);
        });
    })  
})