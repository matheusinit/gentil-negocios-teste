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
})
