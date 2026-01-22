import express from "express";
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Servidor a correr em http://localhost:3000");
});
