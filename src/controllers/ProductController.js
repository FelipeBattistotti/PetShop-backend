const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page, name , description, category } = request.query;
        const user_id = request.headers.authorization;

        const [count] = await connection('product').where('product.user_id', user_id).count();

        let product;

        if (page === undefined) {
            product = await connection('product')
                .where('product.user_id', user_id)
                .andWhere('product.name', 'like' , `%${name || ''}%`)
                .andWhere('product.description', 'like' , `%${description || ''}%`)
                .andWhere('product.category', 'like' , `%${category || ''}%`)
                .select('*');
        } else {
            product = await connection('product')
                .where('product.user_id', user_id)
                .andWhere('product.name', 'like' , `%${name || ''}%`)
                .andWhere('product.description', 'like' , `%${description || ''}%`)
                .andWhere('product.category', 'like' , `%${category || ''}%`)
                .limit(5)
                .offset((page - 1) * 5)
                .select('*');
        }

        response.header('X-Total-Count', count['count(*)']);

        // => sleep
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('GET product - OK');

        return response.json(product);
    },

    async indexByID(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const product = await connection('product')
                .where('product.user_id', user_id)
                .andWhere('id', id)
                .select('*')
                .first();

        if (product === undefined) {
            console.log('GET product - NOK');
            console.log('Product not found!');
            return response.status(401).json({ error: 'Product not found!' });
        }

        if (product.user_id != user_id) {
            console.log('GET product - NOK');
            console.log('Operation not allowed!');
            return response.status(401).json({ error: 'Operation not allowed!' });
        }

        console.log('GET product - OK');

        return response.json(product);
    },

    async create(request, response) {
        const { name, description, category, price, stock_quantity } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('product').insert({
            name,
            description,
            category,
            price,
            stock_quantity,
            user_id,
        });

        console.log('CREATE product - OK');

        return response.json({ id });
    },

    async update(request, response) {
        const { id, name, description, category, price, stock_quantity } = request.body;
        const user_id = request.headers.authorization;

        const product = await connection('product')
            .where('id', id)
            .select('user_id')
            .first();

        if (product === undefined) {
            console.log('UPDATE product - NOK');
            console.log('Product not found!');
            return response.status(401).json({ error: 'Product not found!' });
        }

        if (product.user_id != user_id) {
            console.log('UPDATE product - NOK');
            console.log('Operation not allowed!');
            return response.status(401).json({ error: 'Operation not allowed!' });
        }

        await connection('product').where('id', id).update({
            name,
            description,
            category,
            price,
            stock_quantity,
        });

        console.log('UPDATE product - OK');

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const product = await connection('product')
            .where('id', id)
            .select('user_id')
            .first();

        if (product === undefined) {
            console.log('DELETE product - NOK');
            console.log('Product not found!');
            return response.status(401).json({ error: 'Product not found!' });
        }

        if (product.user_id != user_id) {
            console.log('DELETE product - NOK');
            console.log('Operation not allowed!');
            return response.status(401).json({ error: 'Operation not allowed!' });
        }

        await connection('product').where('id', id).delete();

        console.log('DELETE product - OK');

        return response.status(204).send();
    }
};
