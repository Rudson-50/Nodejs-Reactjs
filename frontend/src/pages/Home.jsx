import { useState } from 'react';

const Form = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      nome,
      sobrenome,
      data_nascimento: dataNascimento,
      cpf
    };

    try {
      const emailExistsResponse = await fetch(`http://localhost:3000/api/v1/candidates?email=${email}`);
    const emailExistsData = await emailExistsResponse.json();

    if (emailExistsData.length > 0) {
      alert('Email já cadastrado!');
      return;
    }
      const response = await fetch('http://localhost:3000/api/v1/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        
      } else {
      
        alert("Erro ao cadastrar!");
      }
    } catch (error) {
    
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <section className='center'>
    <form className="form" onSubmit={handleSubmit}>
      <h1>Cadastrar candidato</h1>

      <label htmlFor="email">Email</label>
      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="nome">Nome</label>
      <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />

      <label htmlFor="sobrenome">Sobrenome</label>
      <input type="text" id="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />

      <label htmlFor="dataNascimento">Data de Nascimento</label>
      <input type="date" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />

      <label htmlFor="cpf">CPF</label>
      <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />

      <button className="submit" type="submit">Cadastrar</button>
    </form>
    </section>
  );
};

export default Form;
