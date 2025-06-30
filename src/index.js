const serverless = require("serverless-http");
const express = require("express");
// const crud = require('./db/crud')
// const validators = require('./db/validators')
// const {getDbClient} = require('./db/clients')
const app = express();
// const { getItem, putItem  } = require("./db");
const { addValue, getValue } = require("./redis/redis");
const STAGE = process.env.STAGE || 'prod'
app.use(express.json())

app.get("/api/leads", async (req, res, next) => {
  // const results = await crud.listLeads()
  const response = await getValue(req.body.id);
  return res.status(200).json({
    results: response
  });
});

app.post("/api/leads", async (req, res, next) => {
  // await putItem("crud-test", { id: req.body.id, id_sort: req.body.id, key1: req.body.key1 });
  await addValue(`${req.body.id}`, req.body.key1);
  return res.status(201).json({
    message: "value stored"
  });
});

// server-full app
// app.listen(3000, ()=>{
// console.log("running at http://localhost:3000")
// })

// module.exports.app = app
module.exports.leadsHandler = serverless(app);
