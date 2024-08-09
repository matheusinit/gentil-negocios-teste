import express from 'express'

import ListPessoasController from './controllers/list-pessoas-controller'
import GetPessoasController from './controllers/get-pessoas-controller'
import CreatePessoasController from './controllers/create-pessoas-controller'
import UpdatePessoasController from './controllers/update-pessoas-controller'
import DeletePessoasController from './controllers/delete-pessoas-controller'

const app = express()
app.use(express.json())

const listPessoasController = new ListPessoasController()

app.get('/pessoas', listPessoasController.handle)

const getPessoasController = new GetPessoasController()

app.get('/pessoas/:id', getPessoasController.handle)

const createPessoasController = new CreatePessoasController()

app.post('/pessoas', createPessoasController.handle)

const updatePessoasController = new UpdatePessoasController()

app.put('/pessoas/:id', updatePessoasController.handle)

const deletePessoasController = new DeletePessoasController()

app.delete('/pessoas/:id', deletePessoasController.handle)

export default app
