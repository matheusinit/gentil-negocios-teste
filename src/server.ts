import express, { Request, Response } from 'express'
import './config/environment'
import { db } from './infra/db'

const app = express()

console.log(process.env['DATABASE_URL'])

app.get('/', async (request: Request, response: Response) => {
  const count = await db.pessoas.count()

  console.log(count)
})

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
