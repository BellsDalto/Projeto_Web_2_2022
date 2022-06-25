import express from 'express';
import User from '../model/users.js'
const router = express.Router();
router.post('/register', async(req, res) => {
    try {
        const user = await User.create(req.body);

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
});

export default router;