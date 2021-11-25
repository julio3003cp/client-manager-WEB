import React, { useEffect, useState } from 'react';
import { Button, Confirm, Header, Table } from 'semantic-ui-react'
import AddNew from './Modal';
import { useNavigate } from 'react-router-dom';


const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const history = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);

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

  function handleCancel(){
    setOpenConfirmation(false);
  }

  function handleConfirm(){
    setOpenConfirmation(false);
  }
  return (
    <>
      <Header as="h1">Clients</Header>
      <div style={{ float: 'right', padding: 10 }}>
        <Button positive circular icon='refresh' onClick={() => getClients()} />
        <AddNew />
        <Button negative circular icon='remove' onClick={() => setOpenConfirmation(true)} />
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
      <Confirm
        open={openConfirmation}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  )
}


export default ClientsTable;