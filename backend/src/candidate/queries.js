const getCandidates = "SELECT * FROM candidates";
const getCandidatesById = "SELECT * FROM candidates WHERE id = $1";
const checkEmailExists = "SELECT s FROM candidates s WHERE s.email = $1";
const addCandidate =
  "INSERT INTO candidates (email, nome, sobrenome, data_nascimento, cpf) VALUES ($1, $2, $3, $4, $5)";
const deleteCandidate = "DELETE FROM candidates WHERE id = $1";
const updateCandidate = "UPDATE candidates SET nome = $1, sobrenome = $2, data_nascimento = $3, cpf = $4 WHERE id = $5";
module.exports = {
  getCandidates,
  getCandidatesById,
  checkEmailExists,
  addCandidate,
  deleteCandidate,
  updateCandidate
};
