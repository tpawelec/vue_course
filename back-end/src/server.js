import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';


async function start() {

    const client = new MongoClient(`mongodb+srv://tpawelec:YWvPFFwfpGgDV3j5@cluster0.hvb1dn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    await client.connect();
    const db = client.db('vue_course');

    const app = express();
    app.use(express.json())
    app.use('/images', express.static(path.join(__dirname, '../assets')));
    async function populateCartIds(ids) {
        await client.connect();
        const db = client.db('vue_course');
        return Promise.all(
            ids.map(id => db.collection('products').findOne({ id }))
            )
    }


    app.get('/api/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray()
        res.json(products)
    })



    app.get('/api/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart)
    })



    app.get('/api/products/:productId', async (req, res) => {
        const productId = req.params.productId
        //const product = products.find(product => product.id === productId)
        const product = await db.collection('products').findOne({ id: productId })
        res.json(product)
    })

    app.post('/api/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId
        const productId = req.body.id

        const existingUser = await db.collection('users').findOne({ id:  userId });

        if(!existingUser) {
            await db.collection('users').insertOne({ id: userId, cartItems: []})
        }

        await db.collection('users').updateOne({ id: userId}, {
            $addToSet: {cartItems: productId}
        })
        
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart)
    })

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const productId = req.params.productId
        const userId = req.params.userId

        await db.collection('users').updateOne({ id: userId}, {
            $pull: {cartItems: productId}
        })

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart)

    })

    app.listen(8000, () => {
        console.log('Server is running on 8000')
    })
}

start();