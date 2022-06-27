import { MongoClient as client } from 'mongodb';
const uri = process.env.MONGO_URI;
export default class User {

    static async create(user) {
        client.connect(uri, (err, conn) => {
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
    static async findUsername(query) {
        const conn = await client.connect(uri),
            db = conn.db(),
            result = await db.collection('users')
            .find({ username: query }).toArray();
        conn.close();
        return result;

    }
    static async findEmail(query) {
        const conn = await client.connect(uri),
            db = conn.db(),
            result = await db.collection('users')
            .find({ email: query }).toArray();
        conn.close();
        return result;

    }
    static async login(email, password) {
        const conn = await client.connect(uri),
            db = conn.db(),
            result = await db.collection('users')
            .find({ email: email, password: password }).toArray();
        conn.close();
        return result;
    }

}