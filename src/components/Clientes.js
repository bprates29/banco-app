import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ id: '', nome: '', email: '', isAtivo: true });
  const [nomeBusca, setNomeBusca] = useState('');
  const [clientesAtivos, setClientesAtivos] = useState([]);

  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = () => {
    axios.get('http://localhost:8080/clientes/listar')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  };

  const incluirCliente = () => {
    axios.post('http://localhost:8080/clientes/incluir', novoCliente)
      .then(() => {
        buscarClientes();
        setNovoCliente({ id: '', nome: '', email: '', isAtivo: true });
      })
      .catch(error => console.error('Erro ao incluir cliente:', error));
  };

  const excluirCliente = (id) => {
    axios.delete(`http://localhost:8080/clientes/${id}`)
      .then(() => buscarClientes())
      .catch(error => console.error('Erro ao excluir cliente:', error));
  };

  const buscarClientesPorNome = () => {
    axios.get('http://localhost:8080/clientes/buscar/nome', {
      params: { nome: nomeBusca }
    })
      .then(response => setClientes(response.data))
      .catch(error => console.error('Erro ao buscar clientes por nome:', error));
  };

  const listarClientesAtivos = () => {
    axios.get('http://localhost:8080/clientes/ativos')
      .then(response => setClientesAtivos(response.data))
      .catch(error => console.error('Erro ao listar clientes ativos:', error));
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <input
        type="text"
        placeholder="Buscar por Nome"
        value={nomeBusca}
        onChange={(e) => setNomeBusca(e.target.value)}
      />
      <button onClick={buscarClientesPorNome}>Buscar</button>
      <button onClick={listarClientesAtivos}>Listar Clientes Ativos</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.isAtivo ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Incluir Novo Cliente</h3>
      <input
        type="text"
        placeholder="ID"
        value={novoCliente.id}
        onChange={(e) => setNovoCliente({ ...novoCliente, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nome"
        value={novoCliente.nome}
        onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={novoCliente.email}
        onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
      />
      <button onClick={incluirCliente}>Incluir</button>

      <h3>Clientes Ativos</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clientesAtivos.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.isAtivo ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;