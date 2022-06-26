import { MongoClient as client } from 'mongodb';
export default class User {

    static async create(user) {
        client.connect('mongodb://localhost:27017/projetoweb3', (err, conn) => {
            if (err) throw err;
            const db = conn.db();

            //insere um item no banco de dados
            db.collection('users').insertOne({ username: user.username, email: user.email, password: user.password }, (err, res) => {
                if (err) throw err;
                console.log('Insert sucessful!');
                conn.close();
            });
        });
    }


}