import express from 'express'
import swaggerUI from 'swagger-ui-express'
// import swaggerJsDoc from 'swagger-jsdoc';
import YAML from 'yamljs'
const swaggerOptions = YAML.load('./docs/api.yaml')

const users = [
    { id: 1, name: 'Fito Paez' },
    { id: 2, name: 'Vicentico' },
    { id: 3, name: 'Gustavo Cerati' },
]

// const swaggerOptions = {
//     definition: {
//         // openapi: '3.0.1',
//         swagger: '2.0',
//         info: {
//             title: 'My Super API',
//             description: 'An awesome Super API for Coders',
//             version: '1.0.0'
//         }
//     },
//     apis: ['./docs/**/*.yaml']
// }
const app = express();
app.use(express.json())

// app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerOptions)));
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.get('/api/string', (req, res) => res.status(400).send('This is an awesome string'))
app.get('/api/user', (req, res) => res.json({ id: 1, name: 'Fito Paez' }))
app.get('/api/users', (req, res) => {
    res.send(users)
})
app.get('/api/users/:id', (req, res) => {
    res.send(users.find(item => item.id === parseInt(req.params.id)))
})
app.post('/api/create', (req, res) => {
    const id = (users.length === 0) ? 1 : users[users.length-1].id + 1
    users.push({ id, ...req.body })
    res.send(users)
})
app.get('/api/usersQuery', (req, res) => {
    res.send(users.find(item => item.id === parseInt(req.query.id)))
})

app.listen(8080, () => console.log('Server Up'))