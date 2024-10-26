const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const { ObjectId } = require('mongodb'); // Ensure ObjectId is imported

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connectToDatabase();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route to insert a document into a collection
app.post('/add', async (req, res) => {
  try {
    const database = client.db('hackunt');
    const collection = database.collection('Users');
    
    // Assuming req.body contains { _id, songName, songData }
    const { _id, songName, songData } = req.body;

    // Validate input
    if (!_id || !songName || !songData) {
      res.status(400).send("Invalid input");
      return;
    }

    // Add the song to the "songs" field of the document with the given _id
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) }, // Find the document by _id
      { $set: { [`songs.${songName}`]: songData } } // Add the song to songs
    );

    if (result.matchedCount === 0) {
      res.status(404).send("Document not found");
      return;
    }

    res.status(200).send("Song added successfully");
  } catch (error) {
    console.error("Error adding song:", error); // Log the error
    res.status(500).send(error.message); // Send the error message
  }
});

app.get('/test', async (req, res) =>{
  try{
    const database = client.db('hackunt');
    const collection = database.collection('Users');
    const result = await collection.find({}).toArray();
    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
