import express from 'express';
import cors from 'cors';
import router from './router/route_user.js';
import User from './model/users.js'
import AuthRules from './model/authRules.js';
const app = express();
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
/*app.use('./router', router);*/
app.post('/register', async(req, res, next) => {
    try {


        const user = req.body;
        let username = user.username;
        let email = user.email;
        let emailUnique = await AuthRules.emailIsUnique(email);
        console.log(emailUnique);
        let usernameUnique = await AuthRules.usernameIsUnique(username);
        if (!emailUnique) {
            return res.status(500).send({ error: 'Email is already registered' });

        } else if (!usernameUnique) {
            return res.status(500).send({ error: 'Username is already registered' });

        } else {
            User.create(user);

        }
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