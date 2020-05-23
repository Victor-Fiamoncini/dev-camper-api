import UserDAO from '../models/User/UserDAO'
import User from '../models/User/User'

import cookieResponse from '../utils/cookieResponse'

class SessionController {
	constructor(dao) {
		this.dao = dao
	}

	async store(req, res) {
		const { email, password } = req.body
		const user = await this.dao.findByEmail(email)

		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' })
		}

		if (!(await user.matchPassword(password))) {
			return res.status(400).json({ error: 'Invalid credentials' })
		}

		user.password = undefined

		return cookieResponse(user, 201, res)
	}

	async refresh(req, res) {
		const user = await this.dao.show(req.userId)

		return res.status(200).json(user)
	}
}

export default new SessionController(new UserDAO(User))
