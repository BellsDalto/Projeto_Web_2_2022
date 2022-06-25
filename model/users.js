import { MongoClient as client } from 'mongodb';
import md5 from 'md5';
export default class User {

    static async create(user) {
        client.connect('mongodb://localhost:27017/projetoweb3', (err, conn) => {
            if (err) throw err;
            const db = conn.db();

            //insere um item no banco de dados
            db.collection('users').insertOne({ user }, (err, res) => {
                if (err) throw err;
                console.log('Insert sucessful!');
                conn.close();
            });
        });
    }

}