import express from "express";
import fs from "fs";

const app =  express();
app.use(express.json());

const arqLivro = "./src/livros.json";
const livros = JSON.parse(fs.readFileSync(arqLivro));

app.get("/", (req, res) => {
    res.status(200).send("API Biblioteca em Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    fs.writeFileSync(arqLivro, JSON.stringify(livros));
    res.status(201).send("Livro cadastrado com sucesso");
})

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id == id;
    })
}

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    if (index == -1) {
        res.status(404).send("Livro nao encontrado");
    } else {
        res.status(200).json(livros[index]);
    }    
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    if (index == -1) {
        res.status(404).send("Livro nao encontrado");
    } else {
        livros[index].titulo = req.body.titulo;
        fs.writeFileSync(arqLivro, JSON.stringify(livros));
        res.status(200).json(livros);
    }    
})

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    if (index == -1) {
        res.status(404).send("Livro nao encontrado");
    } else {
        livros.splice(index, 1);
        fs.writeFileSync(arqLivro, JSON.stringify(livros));
        res.status(204).send('Livro removido com sucesso.');
    }
});

export default app;
