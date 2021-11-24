import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react'
import CreateNewClient from './Modal';

const ClientsTable = () => {
  const [clients, setClients] = useState([]);

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
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <>
      <div style={{ float: 'right', padding: 10 }}>
        <Button positive circular icon='refresh' onClick={() => getClients()} />
        <CreateNewClient ></CreateNewClient>
        <Button negative circular icon='remove' onClick={() => getClients()} />
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
                <Table.Row key={element.id}>
                  <Table.Cell>{element.companyId}</Table.Cell>
                  <Table.Cell>{element.id}</Table.Cell>
                  <Table.Cell>{element.name}</Table.Cell>
                  <Table.Cell>{element.lastName}</Table.Cell>
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