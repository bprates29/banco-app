import React from 'react';

function Menu({ setSection }) {
  return (
    <nav>
      <button onClick={() => setSection('clientes')}>Clientes</button>
      <button onClick={() => setSection('contas')}>Contas</button>
      <button onClick={() => setSection('transacoes')}>Transações</button>
    </nav>
  );
}

export default Menu;