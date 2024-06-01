const request = require('supertest')
const router = require('../routes/index')
const {MongoClient} = require('mongodb')
const env = require('dotenv').config()
const app = require('../server')




describe('Good Home Routes', function () {
    let connection;
    let db;
    beforeAll(async () => {
      connection = await MongoClient.connect((process.env.CONNECTION_STRING), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     // db = await connection.db('CarDealership')//.collection('vehicles').find().toArray()
     
    });
  
    afterAll(async () => {
      await connection.close();
    });




    //end of exprimental area



    test('responds to /', async () => {
        const res = await request(app).get('/');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        // console.log("here is res in the index route...",await res.text)
        expect(res.statusCode).toBe(200);
        // expect(res.text).toEqual('Logged Out');
    });

    test('responds to /vehicles', async () => {
        db = await connection.db('CarDealership').collection('vehicles').find().toArray()
        const res = await request(app).get('/vehicles'); 
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
       // console.log("here is res in the vehicle...", res.text,'\nhere is res body',res.body, '\n here is db',db)
        
    //    console.log('here is db...',db ,'\n here res.body',res.body, 'here is res.text...',res.text)
       expect(res.statusCode).toBe(200);
    //    expect(res.body).toBe(db)
   
    });

    test('Gets all customers', async() =>{
        // db = await connection.db('CarDealership').collection('customers').find().toArray()
        const res = await request(app).get('/customers')
        expect(res.statusCode).toBe(200)
       
    })

    test('Gets all employees', async() =>{
        // db = await connection.db('CarDealership').collection('customers').find().toArray()
        const res = await request(app).get('/employees')
        expect(res.statusCode).toBe(200)
       
    })

    test('Gets all dealerships', async() =>{
        // db = await connection.db('CarDealership').collection('customers').find().toArray()
        const res = await request(app).get('/dealerships')
        expect(res.statusCode).toBe(200)
       
    })
}); 