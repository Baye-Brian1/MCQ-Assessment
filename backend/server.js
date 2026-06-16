const express = require ("express");

 const app = express();
 app.get("api/quize", (req, res) => {
    res.send("submit your question")
 });

 app.listen(4000, () => {
    console.log("server started on PORT 4000");
 });