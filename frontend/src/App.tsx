import React from 'react';

import './App.css';
// bootstrap
import { Container, Jumbotron } from 'react-bootstrap';

// components
import Header from "./components/Layout/Header/index";
import DataTable from "./components/DataTable/index";

function App() {

  return (
    <Container fluid="md" className="App">
      <Header/>
      <div className="main w-100 mx-0">
        <Jumbotron>
          <h2 className="header">
            Sensor Readings
          </h2>
        </Jumbotron>
        <DataTable/>
      </div>
    </Container>
    );
  }

  export default App;
