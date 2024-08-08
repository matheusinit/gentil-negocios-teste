import express, { Request, Response } from 'express'
import './config/environment'
import { db } from './infra/db'

const app = express()

console.log(process.env['DATABASE_URL'])

app.get('/pessoas', async (request: Request, response: Response) => {
  const pessoas = await db.pessoas.findMany()

  return response.status(200).json(pessoas)
})

app.post('/pessoas', async (request: Request, response: Response) => {
  const nome = request.body['nome']
  const nomeMae = request.body['nomeMae']
  const nomePai = request.body['nomePai']
  const cpf = request.body['cpf']
  const dataNascimento = request.body['dataNascimento']
  const salario = request.body['salario']
  const observacoes = request.body['observacoes']

  const pessoa = await db.pessoas.create({
    data: {
      nome,
      nomeMae,
      nomePai,
      cpf,
      dataNascimento,
      salario,
      observacoes
    }
  })

  return response.status(201).json(pessoa)
})

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
