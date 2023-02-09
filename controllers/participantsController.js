const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.URI;
const client = new MongoClient(uri);

const dbname = "tournament";
const collection_name = "tournament1";

const participantsCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database 🌍`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const getParticipants = async (req, res) => {
  try {
    await connectToDatabase();
    let result = await participantsCollection
      .find({ name: { $exists: true } })
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(`Error finding participants: ${err}`);
  } finally {
    await client.close();
  }
};

// Post entries in json form
// route: POST /entries
// access: Private
// req.body format (object):
// [{name1: name1}, {name2: name2}]
const postParticipants = async (req, res) => {
  try {
    await connectToDatabase();
    let result = await participantsCollection.insertMany(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(`Error adding participants: ${err}`);
  } finally {
    await client.close();
  }
};

// const createCol = async (req, res) => {
//   try {
//     await connectToDatabase();
//     const db = client.db(dbname);
//     await db.createCollection("NewCollection5");
//     res.send({ message: "Collection created successfully" });
//     console.log("Collection created successfully");
//   } catch (err) {
//     console.log("Error creating new collection");
//   } finally {
//     await client.close();
//   }
// };
// Delete entries
// route: DEL /entries/:id
// access: Private
// const delParticipants = async (req, res) => {
//   try {
//     await connectToDatabase();
//     let result = await entriesCollection.deleteOne({
//       _id: ObjectId(req.params.id),
//     });
//     res.status(200).json({ message: `Deleted entry with id ${req.params.id}` });
//   } catch (err) {
//     console.error(`Error deleting entry: ${err}`);
//   } finally {
//     await client.close();
//   }
// };

module.exports = { getParticipants, postParticipants };
