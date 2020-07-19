const connection = require('../database/connection');
const encryptPWD = require('../utils/encryptPWD');
const sendEmail = require('../utils/sendEmail');

module.exports = {
    async create(request, response) {

        const { email, pwd } = request.body;

        const user = await connection('user')
            .where('email', email)
            .andWhere('pwd', encryptPWD(pwd))
            .select('id')
            .first();

        if (!user) {
            console.log('LOGIN user - NOK');
            console.log('No User found with this Login!');
            return response.status(400).json({ error: 'No User found with this Login!' });
        }

        sendEmail(email);

        console.log('LOGIN user - OK');

        return response.json(user);
    }
};
