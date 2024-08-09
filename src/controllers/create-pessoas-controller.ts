import { Request, Response } from 'express'
import { db } from '../infra/db'

class CreatePessoasController {
  async handle(request: Request, response: Response) {
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

    if (!observacoes) {
      return response.status(400).send({
        message: '\'observacoes\' is missing. Provide a valid string.'
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
  }
}

export default CreatePessoasController
