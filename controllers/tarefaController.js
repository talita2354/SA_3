
const tarefaModel = require("../models/tarefaModel");

class TarefaController {
 
  
  apiReadList(req, res) {
    const retorno = tarefaModel.apiReadList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhuma tarefa foi encontrada!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  
  apiRead(req, res) {
    
    const { id } = req.params;
    
    const retorno = tarefaModel.apiRead(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("tarefa não encontrada!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  
  apiCreate(req, res) {
    
    const reqBody = req.body; 
    
    const retorno = tarefaModel.apiCreate(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("tarefa criada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  
  apiUpdate(req, res) {
    
    const { id } = req.params;
    
    const reqBody = req.body;
      
   
    const retorno = tarefaModel.apiUpdate(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("tarefa atualizada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  
  apiDelete(req, res) {
    
    const { id } = req.params;
   
    const retorno = tarefaModel.apiDelete(id);
    return retorno
      .then((result) =>
        res.status(200).send("tarefa deletada com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  

  viewCreate(req, res) {
    return res.status(200).render("./tarefa/tarefa_create", { title: "Adicionar tarefa" });
  }
  

  viewReadList(req, res) {

    const tarefasList = tarefaModel.readList();
    return tarefasList
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./tarefa/tarefa_read", { title: "Tarefas", tarefas: result })
          : res.status(200).render("./tarefa/tarefa_read", { title: "Tarefas", tarefas: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  viewUpdate(req, res) {
    
    const { id } = req.params;
    
    const tarefa = tarefaModel.read(id);
    return tarefa
      .then((result) =>
        result.length == 0
          ? res.status(404).redirect("/")
          : res.status(200).render("./tarefa/tarefa_update", { title: "Atualizar tarefa", tarefas: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  viewHomePage(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial"});
  }

  
  create(req, res) {
 
    const newtarefa = req.body;
    const tarefa = tarefaModel.create(newtarefa);
    return tarefa
      .then((result) => res.status(201).send("<script> alert('tarefa criada com sucesso!'); window.location='/tarefa' </script>"))
      .catch((error) => res.status(400).send(error.message));    
  }

  // Método para atualizar uma tarefa existente por ID
  update(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Obtém os dados atualizados da tarefa do corpo da requisição
    const updatedtarefa = req.body;
    // Chama a função update() do modelo tarefaModel para atualizar a tarefa com o ID fornecido
    const tarefa = tarefaModel.update(updatedtarefa, id);
    return tarefa
      .then((result) => res.status(200).send("<script> alert('tarefa atualizada com sucesso!'); window.location='../../tarefa' </script>"))
      .catch((error) => res.status(400).send(error.message));   
  }

  // Método para excluir uma tarefa existente por ID
  delete(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função delete() do modelo tarefaModel para excluir a tarefa com o ID fornecido
    const tarefa = tarefaModel.delete(id);
    return tarefa
      .then((result) => res.status(200).send("<script> alert('tarefa excluída com sucesso!'); window.location='../../tarefa' </script>"))
      .catch((error) => res.status(400).send(error.message));  
  }

}

// Exporta uma instância da classe TarefaController para ser utilizada em outros arquivos do projeto
module.exports = new TarefaController();
