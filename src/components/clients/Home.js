import React, { useEffect, useState } from 'react';
import { Button, Header, Table } from 'semantic-ui-react'
import AddNew from './Modal';
import { useNavigate } from 'react-router-dom';


const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getClients()
  }, []);

  function getClients() {
    fetch("https://localhost/api/clients")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setClients(data);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function getClientId(e) {
    history(`/edit/${e.target.parentElement.id}`);
  }

  return (
    <>
      <Header as="h1">Clients</Header>
      <div style={{ float: 'right', padding: 10 }}>
        <Button positive circular icon='refresh' onClick={() => getClients()} />
        <AddNew />
      </div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Id</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>LastName</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            clients.map(element => {
              return (
                <Table.Row id={element.clientId} key={element.clientId} onClick={(e) => getClientId(e)}>
                  <Table.Cell>{element.companyId}</Table.Cell>
                  <Table.Cell>{element.id}</Table.Cell>
                  <Table.Cell>{element.name}</Table.Cell>
                  <Table.Cell >{element.lastName}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  )
}


export default ClientsTable;