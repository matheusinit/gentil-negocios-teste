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

describe('Create Pessoas Controller', () => {
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

  describe('given a invalid body', () => {
    it('when \'nome\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nomeMae: "Ana Clara Marcedo Fernandes",
        nomePai: "Mário José Marcedo",
        cpf: "12345678900",
        dataNascimento: "1990-03-21",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'nome\' is missing. Provide a valid string.'
      })
    })

    it('when \'nomeMae\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomePai: "Mário José Marcedo",
        cpf: "12345678900",
        dataNascimento: "1990-03-21",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'nomeMae\' is missing. Provide a valid string.'
      })
    })

    it('when \'nomePai\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomeMae: "Ana Clara Marcedo Fernandes",
        cpf: "12345678900",
        dataNascimento: "1990-03-21",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'nomePai\' is missing. Provide a valid string.'
      })
    })

    it('when \'cpf\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomeMae: "Ana Clara Marcedo Fernandes",
        nomePai: "Mário José Marcedo",
        dataNascimento: "1990-03-21",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'cpf\' is missing. Provide a valid string.'
      })
    })

    it('when \'dataNascimento\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomeMae: "Ana Clara Marcedo Fernandes",
        nomePai: "Mário José Marcedo",
        cpf: "12345678900",
        salario: 5000.00,
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'dataNascimento\' is missing. Provide a valid string.'
      })
    })

    it('when \'salario\' is not provided, then should get bad request error', async () => {
      const pessoa: Pessoa = {
        nome: "Matheus Fernandes",
        nomeMae: "Ana Clara Marcedo Fernandes",
        nomePai: "Mário José Marcedo",
        cpf: "12345678900",
        dataNascimento: "1990-03-21",
        observacoes: "Funcionário do mês"
      }

      const response = await request(app).post('/pessoas').send(pessoa)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: '\'salario\' is missing. Provide a valid string.'
      })
    })
  })
})
