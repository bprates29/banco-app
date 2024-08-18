import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contas() {
  const [contas, setContas] = useState([]);
  const [novaConta, setNovaConta] = useState({ id: '', saldo: '', numeroConta: '' });

  useEffect(() => {
    buscarContas();
  }, []);

  const buscarContas = () => {
    axios.get('http://localhost:8080/contas/listar')
      .then(response => setContas(response.data))
      .catch(error => console.error('Erro ao buscar contas:', error));
  };

  const incluirConta = () => {
    axios.post('http://localhost:8080/contas/incluir', novaConta)
      .then(() => {
        buscarContas();
        setNovaConta({ id: '', saldo: '', numeroConta: '' });
      })
      .catch(error => console.error('Erro ao incluir conta:', error));
  };

  const excluirConta = (id) => {
    axios.delete(`http://localhost:8080/contas/${id}`)
      .then(() => buscarContas())
      .catch(error => console.error('Erro ao excluir conta:', error));
  };

  return (
    <div>
      <h2>Lista de Contas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Saldo</th>
            <th>Número da Conta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.map(conta => (
            <tr key={conta.id}>
              <td>{conta.id}</td>
              <td>{conta.saldo}</td>
              <td>{conta.numeroConta}</td>
              <td>
                <button onClick={() => excluirConta(conta.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Incluir Nova Conta</h3>
      <input
        type="text"
        placeholder="ID"
        value={novaConta.id}
        onChange={(e) => setNovaConta({ ...novaConta, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Saldo"
        value={novaConta.saldo}
        onChange={(e) => setNovaConta({ ...novaConta, saldo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Número da Conta"
        value={novaConta.numeroConta}
        onChange={(e) => setNovaConta({ ...novaConta, numeroConta: e.target.value })}
      />
      <button onClick={incluirConta}>Incluir</button>
    </div>
  );
}

export default Contas;