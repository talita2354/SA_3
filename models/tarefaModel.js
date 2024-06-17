const dbConnection = require("../db/dbConnection");

class TarefaModel {
  executeSQL(sql, parameters = "") {
    return new Promise(function (resolve, reject) {
      dbConnection.query(sql, parameters, function (error, resposta) {
        if (error) {
          return reject(error);
        }

        return resolve(resposta);
      });
    });
  }

  apiReadList() {
    const sql =
      "SELECT id, descricao, situacao, data_abertura, data_conclusao FROM tarefa";
    return this.executeSQL(sql); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para obter uma vaga de emprego específica por ID no banco de dados
  apiRead(id) {
    const sql =
      "SELECT id, descricao, situacao, data_abertura, data_conclusao FROM tarefa WHERE id = ?"; // Consulta SQL para selecionar uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para criar uma nova vaga de emprego no banco de dados
  apiCreate(newtarefa) {
    const sql = "INSERT INTO tarefa SET ?"; // Consulta SQL para inserir uma nova vaga de emprego
    return this.executeSQL(sql, newtarefa); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para atualizar uma vaga de emprego existente por ID no banco de dados
  apiUpdate(updatedtarefa, id) {
    const sql = "UPDATE tarefa SET ? WHERE id = ?"; // Consulta SQL para atualizar uma vaga de emprego por ID
    return this.executeSQL(sql, [updatedtarefa, id]); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para excluir uma vaga de emprego existente por ID no banco de dados
  apiDelete(id) {
    const sql = "DELETE FROM tarefa WHERE id = ?"; // Consulta SQL para excluir uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // ----------------------------------------------------------------------------------------------
  // Integração Front End x Back End
  // ----------------------------------------------------------------------------------------------

  // Método para obter a lista de todas as vagas de emprego no banco de dados
  readList() {
    const sql =
      "SELECT id, descricao, situacao, data_abertura, data_conclusao FROM tarefa"; // Consulta SQL para selecionar todas as vagas de emprego
    return this.executeSQL(sql); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para obter uma vaga de emprego específica por ID no banco de dados
  read(id) {
    const sql =
      "SELECT id, descricao, situacao, data_abertura, data_conclusao FROM tarefa WHERE id = ?"; // Consulta SQL para selecionar uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para criar uma nova vaga de emprego no banco de dados
  create(newtarefa) {
    const sql =
      "INSERT INTO tarefa (descricao, situacao, data_abertura, data_conclusao) VALUES (?, ?,?,?)"; // Consulta SQL corrigida para inserir uma nova vaga de emprego
    const values = [
      newtarefa.descricao,
      newtarefa.situacao,
      newtarefa.data_abertura,
      newtarefa.data_conclusao,
    ]; // Valores a serem inseridos na consulta SQL
    return this.executeSQL(sql, values); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para atualizar uma vaga de emprego existente por ID no banco de dados
  update(updatedtarefa, id) {
    const sql =
      "UPDATE tarefa SET descricao = ?, situacao = ?, data_abertura = ? , data_conclusao=? WHERE id = ?"; // Consulta SQL para atualizar uma vaga de emprego por ID
    const values = [
      updatedtarefa.descricao,
      updatedtarefa.situacao,
      updatedtarefa.data_abertura,
      updatedtarefa.data_conclusao,
      id,
    ]; // Valores a serem inseridos na consulta SQL
    return this.executeSQL(sql, values); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }

  // Método para excluir uma vaga de emprego existente por ID no banco de dados
  delete(id) {
    const sql = "DELETE FROM tarefa WHERE id = ?"; // Consulta SQL para excluir uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o resultado
  }
}

// Exporta uma instância da classe TarefaModel para ser utilizada em outros arquivos do projeto
module.exports = new TarefaModel();
