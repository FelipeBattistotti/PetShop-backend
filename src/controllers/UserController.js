const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const encryptPWD = require('../utils/encryptPWD');

module.exports = {

    async index(request, response) {
        const user = await connection('user').select('*');

        console.log('GET user - OK');

        return response.json(user);
    },

    async create(request, response) {

        const { name, email } = request.body;

        const id = generateUniqueId(); // generates unique ID for the user

        const pwd = encryptPWD(request.body.pwd); // encrypts the password

        await connection('user').insert({
            id,
            name,
            email,
            pwd,
        });

        console.log('CREATE user - OK');

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('user').where('id', id).delete();

        console.log('DELETE user - OK');

        return response.status(204).send();
    }
};
