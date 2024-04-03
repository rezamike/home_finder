module.exports = (app) => {
  const Record = require("../models/records");
  
  app.get("/", (req,res) => {
    let result = Record.find({});
    res.send(result).status(200);
  });

  // This section will help you get a list of all the records.
  // app.get("/", async (req, res) => {
  //   let collection = await db.collection("records");
  //   let results = await collection.find({}).toArray();
  //   res.send(results).status(200);
  // });

  // // This section will help you get a single record by id
  // app.get("/:id", async (req, res) => {
  //   let collection = await db.collection("records");
  //   let query = { _id: req.params.id };
  //   let result = await collection.findOne(query);

  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  // });

  // // This section will help you create a new record.
  // app.post("/", async (req, res) => {
  //   try {
  //     let newDocument = {
  //       name: req.body.name,
  //       position: req.body.position,
  //       level: req.body.level,
  //     };
  //     let collection = await db.collection("records");
  //     let result = await collection.insertOne(newDocument);
  //     res.send(result).status(204);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send("Error adding record");
  //   }
  // });

  // // This section will help you update a record by id.
  // app.patch("/:id", async (req, res) => {
  //   try {
  //     const query = { _id: new ObjectId(req.params.id) };
  //     const updates = {
  //       $set: {
  //         name: req.body.name,
  //         position: req.body.position,
  //         level: req.body.level,
  //       },
  //     };

  //     let collection = await db.collection("records");
  //     let result = await collection.updateOne(query, updates);
  //     res.send(result).status(200);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send("Error updating record");
  //   }
  // });

  // // This section will help you delete a record
  // app.delete("/:id", async (req, res) => {
  //   try {
  //     const query = { _id: new ObjectId(req.params.id) };

  //     const collection = db.collection("records");
  //     let result = await collection.deleteOne(query);

  //     res.send(result).status(200);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send("Error deleting record");
  //   }
  // });
}
