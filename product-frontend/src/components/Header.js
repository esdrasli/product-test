import React from 'react';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', borderBottom: '2px solid #ccc' }}>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
          <h1 style={{ margin: 0, fontFamily: 'Arial, sans-serif', fontSize: '32px' }}>
            Cadastro de Produtos
          </h1>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
