import express from 'express';
import cors from 'cors';
import router from './router/route_user.js';
const app = express();
app.use(cors());
app.use(express.static('./public'));
app.use('/register', router);

app.listen(3000);