import { Container, Header } from 'semantic-ui-react';
import './App.css';
import ClientsTable from './components/clients/Table';

function App() {
  return (
    <Container style={{ margin: 20 }}>
      <Header as="h1">Registered Clients</Header>
      <ClientsTable></ClientsTable>
    </Container>
  );
}


export default App;
