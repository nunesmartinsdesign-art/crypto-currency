import express from "express";
import { gerarFeedXML } from "./update-feed.js";

const app = express();

let feedXML = "";

// gerar feed no arranque
async function atualizar() {
  feedXML = await gerarFeedXML();
  console.log("Feed atualizado");
}

atualizar();
setInterval(atualizar, 10000); // 60s

// servir o feed diretamente
app.get("/feed.xml", (req, res) => {
  res.set("Content-Type", "application/xml");
  res.send(feedXML);
});

// servir o site
app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor ativo"));

