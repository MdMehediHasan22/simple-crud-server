const express = require('express');
const {MongoClient,ServerApiVersion,ObjectId} = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://mdmehedi3799:Nasa20201@cluster0.2pip15y.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let userCollection;
let studentCollection;
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("MongoDB connected successfully!");
    const dbUser = client.db('usrersdb');
    userCollection = dbUser.collection('users');
    const dbStudent = client.db('studentsdb');
    studentCollection = dbStudent.collection('students');


    app.post('/users',async(req,res) =>{
      const newUser = req.body;
      console.log("data in the server",newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    app.post('/students',async(req,res) =>{
      const newStudent = req.body;
      console.log("data in the server",newStudent);
      const resultStd = await studentCollection.insertOne(newStudent);
      res.send(resultStd);
    });
    app.delete('/users/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne (query);
      res.send(result);
    });
    app.delete('/students/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await studentCollection.deleteOne(query);
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Simple Crud server Running');
});
app.get('/users', async (req, res) => {
  const users = await userCollection.find().toArray();
  res.send(users);
});
app.get('/students', async (req, res) => {
  const students = await studentCollection.find().toArray();
  res.send(students);
});
app.listen(port,() =>{
    console.log(`Simple crud server running on port ${port} `)
});
