const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API de horários de ônibus de Ibiúna funcionando!");
});

app.get("/consulta", async (req, res) => {
  try {
    const idlinha = req.query.idlinha;

    if (!idlinha) {
      return res.status(400).send("Informe o idlinha.");
    }

    const dados = new URLSearchParams();
    dados.append("idlinha", idlinha);
    dados.append("inicialempresa", "R");

    const resposta = await fetch(
      "https://64.227.4.187/danubio/ajax/consulta_linha.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: dados.toString(),
      }
    );

    const texto = await resposta.text();

    res.set("Access-Control-Allow-Origin", "*");
    res.status(resposta.status).send(texto);

  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao consultar horários: " + erro.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
