import { Request, Response } from 'express'
import { db } from '../infra/db'

class ListPessoasController {
  async handle(request: Request, response: Response) {
    const pessoas = await db.pessoas.findMany()

    return response.status(200).json(pessoas)
  }
}

export default ListPessoasController
