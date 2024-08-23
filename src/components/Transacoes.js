import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [novaTransacao, setNovaTransacao] = useState({ id: '', valor: '', descricao: '', tipo: 'CREDITO' });
  const [tipoBusca, setTipoBusca] = useState('CREDITO');
  const [valorMinimo, setValorMinimo] = useState('');
  const [contaId, setContaId] = useState('');

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

  const buscarTransacoesPorTipo = () => {
    axios.get('http://localhost:8080/transacoes/buscar/tipo', {
      params: { tipo: tipoBusca }
    })
      .then(response => setTransacoes(response.data))
      .catch(error => console.error('Erro ao buscar transações por tipo:', error));
  };

  const buscarTransacoesPorContaId = () => {
    axios.get(`http://localhost:8080/transacoes/buscar/conta/${contaId}`)
      .then(response => setTransacoes(response.data))
      .catch(error => console.error('Erro ao buscar transações por conta:', error));
  };

  const buscarTransacoesPorValorMaiorQue = () => {
    axios.get('http://localhost:8080/transacoes/buscar/valor', {
      params: { valor: valorMinimo }
    })
      .then(response => setTransacoes(response.data))
      .catch(error => console.error('Erro ao buscar transações por valor:', error));
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

      <h3>Buscar Transações por Tipo</h3>
      <select value={tipoBusca} onChange={(e) => setTipoBusca(e.target.value)}>
        <option value="CREDITO">Crédito</option>
        <option value="DEBITO">Débito</option>
      </select>
      <button onClick={buscarTransacoesPorTipo}>Buscar</button>

      <h3>Buscar Transações por Conta</h3>
      <input
        type="text"
        placeholder="ID da Conta"
        value={contaId}
        onChange={(e) => setContaId(e.target.value)}
      />
      <button onClick={buscarTransacoesPorContaId}>Buscar</button>

      <h3>Buscar Transações com Valor Maior que</h3>
      <input
        type="text"
        placeholder="Valor Mínimo"
        value={valorMinimo}
        onChange={(e) => setValorMinimo(e.target.value)}
      />
      <button onClick={buscarTransacoesPorValorMaiorQue}>Buscar</button>
    </div>
  );
}

export default Transacoes;
