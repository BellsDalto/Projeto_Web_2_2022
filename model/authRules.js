import User from './users.js'
export default class AuthRules {
    static async usernameIsUnique(query) {
        let user = await User.findUsername(query);
        if (user.length == 0) {

            return true;

        } else {
            return false;
        }

    }
    static async emailIsUnique(query) {
        let user = await User.findEmail(query);
        if (user.length == 0) {
            return true;
        } else {
            return false;
        }

    }
}