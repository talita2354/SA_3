
const routertarefas = require("./tarefaRouter.js");


module.exports = function (app, express) {
  
  app.use(express.json());
  // Define um middleware do Express (express.urlencoded()) para analisar dados de requisição de formulário HTML e torná-los acessíveis no objeto req.body do Express
  // Ao utilizar este middleware com a configuração { extended: true }, o Express é capaz de analisar corretamente os dados codificados, incluindo arrays e objetos aninhados
  app.use(express.urlencoded({ extended: true }));
  // Adiciona o roteador 'routertarefas' (com as rotas definidas) ao aplicativo Express
  app.use(routertarefas);
};