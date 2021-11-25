import { Container } from 'semantic-ui-react';
import './App.css';
import ClientsTable from './components/clients/Home';

function App() {
  return (
    <Container style={{ margin: 20 }}>
      <ClientsTable></ClientsTable>
    </Container>
  );
}


export default App;
