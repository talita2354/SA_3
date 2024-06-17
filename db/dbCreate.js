class TarefaDatabase {
  initConnection(connection) {
    this.connection = connection;
    this.initDatabase();
  }

  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message);
        return;
      }
      console.log("Banco de dados conectado com sucesso...");
      this.createDatabase();
    });
  }

  createDatabase() {
    const sql = "CREATE DATABASE IF NOT EXISTS db_tarefas";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados..."); // Exibe uma mensagem de erro se a criação do banco falhar
        console.log(error.message);
        return;
      }
      console.log("Banco de dados criado com sucesso..."); // Exibe uma mensagem de sucesso se a criação do banco for bem-sucedida
      // Seleciona o banco de dados recém-criado para utilização
      this.connection.query("USE db_tarefas", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados..."); // Exibe uma mensagem de erro se a seleção do banco falhar
          console.log(error.message); // Exibe o erro detalhado
          return;
        }
        console.log("Banco de dados selecionado com sucesso..."); // Exibe uma mensagem de sucesso se a seleção do banco for bem-sucedida
        this.createTable(); // Chama o método para criar a tabela após criar o banco de dados
      });
    });
  }

  // Método para criar a tabela 'tarefa'
  createTable() {
    // Query SQL para criar a tabela 'tarefa', se ela não existir
    const sql = `
          CREATE TABLE IF NOT EXISTS tarefa (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          descricao VARCHAR(255),
          situacao ENUM('Não iniciada', 'Iniciada', 'Em Andamento', 'Concluída') NOT NULL,
          data_abertura DATE NOT NULL,
          data_conclusao DATE NULL
        )
        `;
    // Executa a query para criar a tabela 'tarefa'
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela tarefa..."); // Exibe uma mensagem de erro se a criação da tabela falhar
        console.log(error.message); // Exibe o erro detalhado
        return;
      }
      console.log("Tabela tarefa criada com sucesso..."); // Exibe uma mensagem de sucesso se a criação da tabela for bem-sucedida
    });
  }
}

// Exporta uma instância da classe TarefaDatabase para ser utilizada em outros arquivos do projeto
module.exports = new TarefaDatabase();
