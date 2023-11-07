//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/gadgetshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//model 1
const UsuarioSchema = new mongoose.Schema({
  email: {type: String, required: true},
  senha: {type: String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//model 2
const produtotendencia = new mongoose.Schema({
    id_produtotendencia: {type: Number, required: true},
    descricao: {type: String},
    marca: {type: String},
    entrega: {type: Date},
    garantia: {type: Number}
});

const ProdutoTendencia = mongoose.model("produtotendencia",  produtotendencia);

//rotas
//rota de get de formulario
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/cadastrousuario", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  //validação de campos
  if(email == null || senha == null){
    return res.status(400).json({error : "Preenchar todos os campos!!!"});
  }

  //teste de duplicidade
  const emailExiste = await Usuario.findOne({email : email});

  if(emailExiste){
    return res.status(400).json({error : "O email informado já existe"});
  }

  const usuario = new Usuario({
    nome: nome,
    senha: senha
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroprodutotendencia", async (req, res) => {
    const id_produtotendencia = req.body.id_produtotendencia;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const entrega = req.body.entrega;
    const garantia = req.body.garantia;

    //teste de duplicidade
    const id_produtotendenciaExiste = await produtotendencia.findOne({id_produtotendencia : id_produtotendencia});
  
    if(id_produtotendenciaExiste){
      return res.status(400).json({error : "O produto informado já foi cadastrado!"});
    }
  
    const produtotendencia = new ProdutoTendencia({
      id_produtotendencia: id_produtotendencia,
      descricao: descricao,
      marca: marca,
      entrega: entrega,
      garantia: garantia
    });
  
    try {
      const newProdutoTendencia = await produtotendencia.save();
      res.json({ error: null, msg: "Cadastro ok", produtotendenciaId: newProdutoTendencia._id });
    } catch (error) {}
});
