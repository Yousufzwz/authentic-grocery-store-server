const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express()
    app.use(cors())
    app.use(bodyParser.json())   
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
res.send('Assalamualaikum')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0v4f5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err)
  const groceryInfo = client.db("groceryStore").collection("itemsInfo");

  const collection = client.db("groceryStore").collection("chosenItems");
  console.log('error', err)
  // perform actions on the collection object
 // client.close();


 app.get('/addProduct' ,(req, res) =>{
  groceryInfo.find({})
  .toArray((err , documents) =>{
      res.send(documents)
  })
})


app.get('/register', (req, res) => {
  groceryInfo.find()
    .toArray((err , document)=>{
        res.send(document)
    })
})

app.get('/register/:key' , (req, res) =>{
  const regId = parseInt(req.params.key) 
  groceryInfo.find({ key : regId})
  .toArray((err , documents) =>{
    res.send(documents)
  })
})


app.post('/addOrder' , (req , res) =>{
  const product = req.body;
  collection.insertOne(product)
  .then(result => {
    res.send(result.insertedCount > 0)
  })

})

app.get('/user' , (req ,res) => {
  
  collection.find({email : req.query.email})
  .toArray((err , documents) => {
    res.send(documents)
  })
})

app.delete('/delete/:id' ,(req, res) => {
  collection.deleteOne({ _id : ObjectID(req.params.id)})
  .then(result => {
    res.send(result.insertedCount > 0)
  })
})


});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

app.listen(process.env.PORT || port)