const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Car Dealership App",
        description: "This is the api for Car Dealership App"
    },
    host:'cse341-team4-final.onrender.com',
    schemes:['https']
    // host: ['localhost:5500'],
    // schemes: ['http']
    
}

const outputFile = './swagger-output.json'
const routes = ['./routes/index']

// generate swagger.json
swaggerAutoGen(outputFile,routes,doc)