import express from 'express';
import cors from 'cors';
import router from './router/route_user.js';
import User from './model/users.js'
const app = express();
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
/*app.use('./router', router);*/
app.post('/register', async(req, res, next) => {
    try {
        console.log(req.body.password);
        console.log('por que está vazio?')

        const user = User.create(req.body);

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Error' });
});


app.listen(3000);