import makeApp from '../../app.js';
import database from '../../database.js';
import request from 'supertest';
import recommendation from '../../models/Recommendation.js';
const app = makeApp(database);



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
describe('tests on the recommendation path',()=>{
    describe('POST /api/recommendation/create',()=>{
        let token;
        const newRecommendation ={
            title:"My test",
            name:"Name test",
            author:"Test",
            recommendation:"recommendation test",
            summary:"summary test",
            image:"image test"
        }
        const newRecommendation2 ={
            title:"My test",
            recommendation:"recommendation test",
            image:"image test"
        }
        
        // Para realizar el testing es necesario registrar un usuario en la BD
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(newUser);
            const response = await request(app).post('/api/auth/login').send(loginInput);
            token = response.body.token;
        });
        
        afterAll( async ()=>{
            await recommendation.deleteMany({title:'My test'});
        });



        it('the path work ',async ()=>{
            const response = await request(app).post('/api/recommendation/create').send(newRecommendation).set('Cookie', [`access_token=${token}`]);          
            expect(response.status).toBe(201);
            expect(response.header['content-type']).toContain('json');
        });
        it('The request returns a json with all the attributes inserted', async ()=>{
            const response = await request(app).post('/api/recommendation/create').send(newRecommendation).set('Cookie', [`access_token=${token}`]); 
            expect(response.body.title).toBeDefined();
            expect(response.body.author).toBeDefined();
            expect(response.body.name).toBeDefined();
            expect(response.body.recommendation).toBeDefined();
            expect(response.body.summary).toBeDefined();
            expect(response.body.image).toBeDefined();
        });
        it('The request return an error',async()=>{
            const response = await request(app).post('/api/recommendation/create').send(newRecommendation2).set('Cookie', [`access_token=${token}`]);
            expect(response.status).toBe(500);
        });
    })  
})