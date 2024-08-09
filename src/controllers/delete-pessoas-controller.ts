import { Request, Response } from 'express'
import { db } from '../infra/db'

class DeletePessoasController {
  async handle(request: Request, response: Response) {
    const id = request.params['id']

    const pessoa = await db.pessoas.delete({
      where: {
        idPessoa: id
      },
    })

    return response.status(204).json(pessoa)
  }
}

export default DeletePessoasController
