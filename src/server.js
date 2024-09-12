const http = require("http");
const port = 3000;

const rotas = {
    "/": "Curso de Express API",
    "/livros": "Entrei na rota livros",
    "/autores": "Entrei na rota autores"
};

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(rotas[req.url]);
  });
  
server.listen(port, () => {
    console.log(`servidor escutando na porta ${port}`);
});


