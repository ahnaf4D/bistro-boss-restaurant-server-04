require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrua0aj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollection = client
      .db('bistroBossRestaurantDB')
      .collection('menu');
    const reviewCollection = client
      .db('bistroBossRestaurantDB')
      .collection('reviews');
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.status(200).send(result);
    });
    app.get('/reviews', async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.status(200).send(result);
    });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('bistro boss restaurant here!!!');
});
app.listen(port, (req, res) => {
  console.log(`server listening on ${port}`);
});
