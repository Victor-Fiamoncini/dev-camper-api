import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes'
import database from './app/database'
import errorHandler from './app/middlewares/errorHandler'

export default class App {
	constructor() {
		this.app = express()

		this.databaseInit()
		this.middlewares()
	}

	get _app() {
		return this.app
	}

	databaseInit() {
		database()
	}

	middlewares() {
		this.app.use(express.json())
		this.app.use(morgan('dev'))
		this.app.use(cors())

		this.app.use(routes)
		this.app.use(errorHandler)
	}
}