No Banco de Postgres 

comandos
CREATE TABLE Candidatos (
  email VARCHAR(255) PRIMARY KEY,
  nome VARCHAR(255),
  sobrenome VARCHAR(255),
  data_nascimento DATE,
  cpf VARCHAR(11),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  uk_id UNIQUE (id);
);
INSERT INTO candidatos (email, nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao)
VALUES
  ('candidato3@example.com', 'Pedro', 'Fernandes', '1992-12-10', '56789012345', now(), now());


Na pasta backend

Npm i para instalação das dependências
Para iniciar o server é o comando "node .\server.js" provavel que vai abrir o back na porta 3000 (http://localhost:3000/)

Na pasta frontend
Npm i para instalação das dependências
Para iniciar o server é o comando "npm run dev" provavel que vai abrir o back na porta 5173 (http://localhost:5173/)