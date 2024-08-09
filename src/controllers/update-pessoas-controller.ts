import { Request, Response } from 'express'
import { db } from '../infra/db'

class UpdatePessoasController {
  async handle(request: Request, response: Response) {
    const id = request.params['id']

    const nome = request.body['nome'] as string | undefined
    const nomeMae = request.body['nomeMae'] as string | undefined
    const nomePai = request.body['nomePai'] as string | undefined
    const cpf = request.body['cpf'] as string | undefined
    const dataNascimento = request.body['dataNascimento'] as string | undefined
    const salario = request.body['salario'] as number | undefined
    const observacoes = request.body['observacoes'] as string | undefined

    const pessoa = await db.pessoas.findUnique({
      where: {
        idPessoa: id
      }
    })


    if (!pessoa) {
      return response.status(404).send({
        message: 'Pessoas not found'
      })
    }

    const pessoaUpdated = await db.pessoas.update({
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

    return response.status(200).send(pessoaUpdated)
  }
}

export default UpdatePessoasController
