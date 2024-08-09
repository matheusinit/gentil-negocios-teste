import { Request, Response } from 'express'
import { db } from '../infra/db'

class GetPessoasController {
  async handle(request: Request, response: Response) {
    const id = request.params['id']

    const pessoa = await db.pessoas.findUnique({
      where: {
        idPessoa: id
      }
    })

    return response.status(200).json(pessoa)
  }
}

export default GetPessoasController
