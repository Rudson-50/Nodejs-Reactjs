import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const Search = () => {
  const [candidate, setCandidate] = useState(null);
  const [editedCandidate, setEditedCandidate] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/candidates");
        const data = await response.json();

        const matchedCandidate = data.find(
          (candidate) => candidate.email === email
        );
        if (matchedCandidate) {
          setCandidate(matchedCandidate);
          setEditedCandidate({ ...matchedCandidate });
        } else {
          setCandidate(null);
          setEditedCandidate(null);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCandidate((prevCandidate) => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/candidates/${candidate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCandidate),
        }
      );
      if (response.ok) {
      console.log("Ok");
      alert("Edição concluída!");
      } else {
        console.log("Erro ao editar candidato");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/candidates/${candidate.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Ok");
        alert("Exclusão concluída!");
      } else {
        console.log("Erro ao excluir candidato");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      {candidate ? (
        <section className="center">
          <form className="form" onSubmit={handleEdit}>
            <h1>Email encontrado!</h1>

            <label htmlFor="">Email</label>
            <input type="text" value={candidate.email} disabled />

            <label htmlFor="">Nome</label>
            <input
              type="text"
              name="nome"
              value={editedCandidate.nome || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={editedCandidate.sobrenome || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="">Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              value={new Date(candidate.data_nascimento).toISOString().split("T")[0]}
              onChange={handleInputChange}
            />

            <label htmlFor="">CPF</label>
            <input
              type="text"
              name="cpf"
              value={editedCandidate.cpf || ""}
              onChange={handleInputChange}
            />

            <div className="buttons">
              <button className="edit" type="submit">
                Editar
              </button>
              <button className="delete" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </form>
        </section>
      ) : (
        <p>Nenhum candidato encontrado com o email digitado.</p>
      )}
    </div>
  );
};

export default Search;
