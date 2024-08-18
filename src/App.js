import React, { useState } from 'react';
import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Contas from './components/Contas';
import Transacoes from './components/Transacoes';
import './App.css'; 

function App() {
  const [section, setSection] = useState('clientes');

  return (
    <div>
      <h1>Sistema Bancário</h1>
      <Menu setSection={setSection} />
      {section === 'clientes' && <Clientes />}
      {section === 'contas' && <Contas />}
      {section === 'transacoes' && <Transacoes />}
    </div>
  );
}

export default App;