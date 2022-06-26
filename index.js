import express from 'express';
import cors from 'cors';
import router from './router/route_user.js';
import User from './model/users.js'
import AuthRules from './model/authRules.js';
import jwt from 'jsonwebtoken';

const SECRET = "3911887299ab4ab5fad0b923d6e2a88d";
const app = express();
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
/*app.use('./router', router);*/
app.post('/register', async(req, res, next) => {
    try {


        var user = req.body;
        let username = user.username;
        let email = user.email;
        let emailUnique = await AuthRules.emailIsUnique(email);
        let usernameUnique = await AuthRules.usernameIsUnique(username);
        if (!emailUnique) {
            return res.status(500).send({ error: 'Email is already registered' });

        } else if (!usernameUnique) {
            return res.status(500).send({ error: 'Username is already registered' });

        } else {
            User.create(user);
            var token = jwt.sign(user, SECRET, {
                expiresIn: 259200
            });


        }
        return res.send({ token });


    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Error' });
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    console.log(user);

    if (user.length == 0) {
        return res.status(400).send({ error: " login failed username or password is incorrect" });
    }
    var token = jwt.sign(user[0], SECRET, {
        expiresIn: 259200,
    });

    return res.send({ token });


});

app.listen(process.env.PORT || 3000);