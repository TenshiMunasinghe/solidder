import type { VercelRequest, VercelResponse } from '@vercel/node'
import mysql from 'mysql'

export default (request: VercelRequest, response: VercelResponse) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  connection.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }

    console.log('connected as id ' + connection.threadId)
  })

  connection.query('SELECT * FROM solids', (error, results, fields) => {
    response.json(results)
  })

  connection.end()
}
