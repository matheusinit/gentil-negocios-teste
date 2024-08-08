import express, { Request, Response } from 'express'
import './config/environment'

const app = express()

console.log(process.env['DATABASE_URL'])

app.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'Hello World' })
})

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
