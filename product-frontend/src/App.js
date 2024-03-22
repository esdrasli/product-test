import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ minHeight: 'calc(100vh - 150px)', paddingTop: 20 }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={Products} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
