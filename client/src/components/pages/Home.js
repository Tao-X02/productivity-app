// Import dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="text-center title">Product Name</h1>
          <h4 className="text-center description">Make your day more productive!</h4>
        </header>
        <Row className="d-grid gap-3">
          <Link to="/login">
            <Button as={Col} variant="primary" size='xs' xs={{ span: 4, offset: 4 }}>Login</Button>
          </Link>
          <Link to="/signup">
            <Button as={Col} variant="success" size='xs' xs={{ span: 4, offset: 4 }}>Sign Up</Button>
          </Link>
        </Row>
      </div>
    );
}

export default App;