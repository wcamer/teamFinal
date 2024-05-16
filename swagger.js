const swaggerAutoGen = require('swagger-autogen')
const doc = {
    info: {
        title: "Car Dealership App",
        description: "This is the api for Car Dealership App"
    },
    // host:'finalProject.onrender.com',
    // schemes:['https']
    host: ['localhost:5500'],
    schemes: ['http','https']
    
}

const outputFile = './swagger-output.json'
const routes = ['./routes/index']

swaggerAutoGen(outputFile,routes,doc)