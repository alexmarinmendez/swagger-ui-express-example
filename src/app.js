import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'My Super API',
            description: 'An awesome Super API for Coders',
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:8080' },
            { url: 'http://mysuperapi.io' },
            { url: 'http://superapi.com' }
        ]
    },
    apis: ['./docs/**/*.yaml']
}
const app = express();

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerOptions)));

app.listen(8080, () => console.log('Server Up'))