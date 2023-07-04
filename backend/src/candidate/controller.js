const pool = require("../../db");
const queries = require("./queries");
const getCandidates = (req, res) => {
  pool.query(queries.getCandidates, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getCandidatesById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCandidatesById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addCandidate = (req, res) => {
    const { email, nome, sobrenome, data_nascimento, cpf } = req.body;
    //se o email existir
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email já existe");
          } 
            // Adiciona o candidato ao banco de dados
            pool.query(
              queries.addCandidate,
              [email, nome, sobrenome, data_nascimento, cpf],
              (error, results) => {
                if (error) throw error;
                res.status(201).send("O candidato foi adicionado");
              }
            );
          
            
        
    });
}

const deleteCandidate = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query(queries.getCandidatesById, [id], (error, results) => {
      if (error) throw error;
  
      if (results.rows.length === 0) {
        res.send("O candidato não existe");
      } else {
        pool.query(queries.deleteCandidate, [id], (error, results) => {
          if (error) throw error;
          res.status(200).send("O candidato foi removido com sucesso");
        });
      }
    });
  };
  

  const updateCandidate = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, sobrenome, data_nascimento, cpf } = req.body;

    pool.query(queries.getCandidatesById, [id], (error, results) => {
        if (error) throw error;
  
        if (results.rows.length === 0) {
          res.send("O candidato não existe");
        } else {
        pool.query(queries.updateCandidate, [ nome, sobrenome, data_nascimento, cpf, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("O candidato foi atualizado com sucesso");
        
        })
    }
    })
  }

  

module.exports = {
  getCandidates,
  getCandidatesById,
  addCandidate,
  deleteCandidate,
  updateCandidate
};
