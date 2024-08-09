import { it, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import { db } from '../src/infra/db'

type Pessoa = {
  nome?: string
  nomeMae?: string
  nomePai?: string
  cpf?: string
  dataNascimento?: String
  salario?: number
  observacoes?: string
}

describe('List Pessoas Controller', () => {
  beforeEach(async () => {
    const tables = Object.keys(db).filter(model => !model.startsWith('_')).filter(model => !model.startsWith('$'));

    for (const model of tables) {
      try {
        await db[model].deleteMany();
        console.log(`Deleted all records from ${model}`);
      } catch (error) {
        console.error(`Failed to delete records from ${model}:`, error);
      }
    }

    await db.$disconnect();
  })

  describe('given any record is in database ', () => {
    it('then should get empty list and ok', async () => {
      const response = await request(app).get('/pessoas')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe('given there is records is database ', () => {
    it('then should get ok and record', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomeMae: "Ana Clara Marcedo Fernandes",
        nomePai: "Mário José Marcedo",
        cpf: "12345678900",
        dataNascimento: "1990-03-21",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      await request(app).post('/pessoas').send(pessoa)

      const response = await request(app).get('/pessoas')

      const pessoaResponse = {
        ...pessoa,
        dataNascimento: new Date(pessoa.dataNascimento).toISOString()
      }
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(pessoaResponse)]))
    })
  })

})
