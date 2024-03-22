import React from 'react';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px 0' }}>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
          <h1 style={{ margin: '0 10px' }}>Natanael Store</h1>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
