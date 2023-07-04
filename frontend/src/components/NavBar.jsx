import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <div className="container">
      <header>
        <nav>
        <Link to="/">
          <button className="signup">
            CADASTRO
          </button></Link>{" "}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite o email do candidato"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit">Pesquisar</button>
          </form>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
