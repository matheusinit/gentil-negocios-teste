import express, { Request, Response } from 'express'
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
  const nome = request.body['nome'] as string
  const nomeMae = request.body['nomeMae'] as string
  const nomePai = request.body['nomePai'] as string
  const cpf = request.body['cpf'] as string
  const dataNascimento = request.body['dataNascimento']
  const salario = Number(request.body['salario'])
  const observacoes = request.body['observacoes'] as string

  if (!nome) {
    return response.status(400).send({
      message: '\'nome\' is missing. Provide a valid string.'
    })
  }

  if (!nomeMae) {
    return response.status(400).send({
      message: '\'nomeMae\' is missing. Provide a valid string.'
    })
  }

  if (!nomePai) {
    return response.status(400).send({
      message: '\'nomePai\' is missing. Provide a valid string.'
    })
  }

  if (!cpf) {
    return response.status(400).send({
      message: '\'cpf\' is missing. Provide a valid string.'
    })
  }

  if (!dataNascimento) {
    return response.status(400).send({
      message: '\'dataNascimento\' is missing. Provide a valid string.'
    })
  }

  if (!salario) {
    return response.status(400).send({
      message: '\'salario\' is missing. Provide a valid string.'
    })
  }

  const dataNascimentoISOString = new Date(dataNascimento).toISOString()

  const pessoa = await db.pessoas.create({
    data: {
      nome,
      nomeMae,
      nomePai,
      cpf,
      dataNascimento: dataNascimentoISOString,
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

export default app
