import express from 'express'
import db from '../db/knex.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, password, role } = req.body

  try {
    let user = await db('users').where({ name }).first()

    if (!user) {
      const [newUserRow] = await db('users').insert({ name, password, role }).returning('*')
      user = newUserRow;
      console.log('User created:', user.name);
    } 
    
    const passwordMatch = (user.password === password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // const token = `fake-jwt-token-${user.id}`

    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      // token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Error logging in or signing up', error: error.message })
  }
})

export default router
