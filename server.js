const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de horários de ônibus de Ibiúna funcionando!");
});

app.get("/consulta", async (req, res) => {
  const idlinha = req.query.idlinha;

  if (!idlinha) {
    return res.status(400).json({
      erro: "Informe o idlinha"
    });
  }

  const url =
    "https://vraposotavares.com.br/danubio/ajax/consulta_linha.php?idlinha=" +
    encodeURIComponent(idlinha);

  try {
    const resposta = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const conteudo = await resposta.text();

    res.status(resposta.status);
    res.set("Content-Type", resposta.headers.get("content-type") || "text/html");
    res.send(conteudo);

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao consultar horários",
      detalhe: erro.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});
