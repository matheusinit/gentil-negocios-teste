import express, { Request, Response } from 'express'
import './config/environment'
import { db } from './infra/db'

const app = express()

app.use(express.json())

app.get('/pessoas', async (request: Request, response: Response) => {
  const pessoas = await db.pessoas.findMany()

  return response.status(200).json(pessoas)
})

app.get('/pessoas/:id', async (request: Request, response: Response) => {
  const id = request.params['id']

  const pessoa = await db.pessoas.findUnique({
    where: {
      idPessoa: id
    }
  })

  return response.status(200).json(pessoa)
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

app.put('/pessoas/:id', async (request: Request, response: Response) => {
  const id = request.params['id']

  const nome = request.body['nome'] as string | undefined
  const nomeMae = request.body['nomeMae'] as string | undefined
  const nomePai = request.body['nomePai'] as string | undefined
  const cpf = request.body['cpf'] as string | undefined
  const dataNascimento = request.body['dataNascimento'] as string | undefined
  const salario = request.body['salario'] as number | undefined
  const observacoes = request.body['observacoes'] as string | undefined

  const pessoa = await db.pessoas.update({
    where: {
      idPessoa: id
    },
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

  return response.status(204).json(pessoa)
})

app.delete('/pessoas/:id', async (request: Request, response: Response) => {
  const id = request.params['id']

  const pessoa = await db.pessoas.delete({
    where: {
      idPessoa: id
    },
  })

  return response.status(204).json(pessoa)
})

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
