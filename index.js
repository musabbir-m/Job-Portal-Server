const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z1jayhr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//

async function run() {
  try {
    const fresherCollection = client.db("jobsPortal").collection("fresherJobs");
    const experiencedColleciton= client.db("jobsPortal").collection("experiencedJobs");
    const companyCollection= client.db("jobsPortal").collection("Companies");
    //load 6 fresher  jobs
    app.get("/fresher", async (req, res) => {
      const query = {};
      const cursor = fresherCollection.find(query);
      const jobs = await cursor.limit(6).toArray();
      res.send(jobs);
    });

    //load all fresher jobs
    
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send({ running: "true" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
