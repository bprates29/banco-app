import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [novaTransacao, setNovaTransacao] = useState({ id: '', valor: '', descricao: '', tipo: 'CREDITO' });

  useEffect(() => {
    buscarTransacoes();
  }, []);

  const buscarTransacoes = () => {
    axios.get('http://localhost:8080/transacoes/listar')
      .then(response => setTransacoes(response.data))
      .catch(error => console.error('Erro ao buscar transações:', error));
  };

  const incluirTransacao = () => {
    axios.post('http://localhost:8080/transacoes/incluir', novaTransacao)
      .then(() => {
        buscarTransacoes();
        setNovaTransacao({ id: '', valor: '', descricao: '', tipo: 'CREDITO' });
      })
      .catch(error => console.error('Erro ao incluir transação:', error));
  };

  const excluirTransacao = (id) => {
    axios.delete(`http://localhost:8080/transacoes/${id}`)
      .then(() => buscarTransacoes())
      .catch(error => console.error('Erro ao excluir transação:', error));
  };

  return (
    <div>
      <h2>Lista de Transações</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map(transacao => (
            <tr key={transacao.id}>
              <td>{transacao.id}</td>
              <td>{transacao.valor}</td>
              <td>{transacao.descricao}</td>
              <td>{transacao.tipo}</td>
              <td>
                <button onClick={() => excluirTransacao(transacao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Incluir Nova Transação</h3>
      <input
        type="text"
        placeholder="ID"
        value={novaTransacao.id}
        onChange={(e) => setNovaTransacao({ ...novaTransacao, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Valor"
        value={novaTransacao.valor}
        onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={novaTransacao.descricao}
        onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
      />
      <select
        value={novaTransacao.tipo}
        onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: e.target.value })}
      >
        <option value="CREDITO">Crédito</option>
        <option value="DEBITO">Débito</option>
      </select>
      <button onClick={incluirTransacao}>Incluir</button>
    </div>
  );
}

export default Transacoes;