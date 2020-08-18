import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Header, Container } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <Container textAlign='center'>
        <Header as='h1'>First Header</Header>
      </Container>
    </div>
  );
}

export default App;
