import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Header, Icon, Container, Button, Form, Confirm } from 'semantic-ui-react'
import AddressesTable from './address/Table';

const ClientSummary = (props) => {
    const params = useParams();
    const history = useNavigate();
    const [client, setClient] = useState({
        companyId: "", clientId: "",
        id: "", name: "", lastName: "", addresses: []
    });
    const [openConfirmation, setOpenConfirmation] = useState(false);

    function getClient() {
        fetch(`https://localhost/api/clients/${params.clientId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setClient(data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getClient();
    }, []);

    function handleChange(e, { name, value }) {
        setClient({ ...client, [name]: value });
    }

    function handleUpdateSubmit() {
        fetch(`https://localhost/api/clients/${client.clientId}`, {
            method: 'PUT',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log("Got it");
                }
                throw response;
            })
            .catch(error => {
                console.error(error);
            })
    }

    function handleDeleteCancel() {
        setOpenConfirmation(false);
    }

    function handleDeleteConfirm() {
        fetch(`https://localhost/api/clients/${client.clientId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.info("client deleted");
                }
                throw response;
            })
            .catch(error => {
                console.error(error);
            })
        setOpenConfirmation(false);
        history("/");
    }

    const ClientInfo = () => {
        return (
            <>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='user' />
                        Client's information
                    </Header>
                </Divider>
                <Form onSubmit={() => handleUpdateSubmit()}>
                    <div>
                        <Button
                            floated='right'
                            circular
                            type='submit'
                            icon='save'
                            positive
                        />
                        <Button
                            floated="right"
                            circular
                            icon='remove'
                            negative
                            onClick={() => setOpenConfirmation(true)}
                        />
                    </div>
                    <Form.Group>
                        <Form.Input name="companyId" fluid label="Company's Id" width={4} onChange={handleChange} value={client.companyId} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input name="clientId" fluid label="Internal Id" width={4} onChange={handleChange} value={client.clientId} />
                        <Form.Input name="id" fluid label='Identification' placeholder='A secondary way to identify a client' width={6} onChange={handleChange} value={client.id} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name="name" fluid label="Name" onChange={handleChange} value={client.name} />
                        <Form.Input name="lastName" fluid label='LastName' onChange={handleChange} value={client.lastName} />
                    </Form.Group>
                </Form>
                <Confirm
                    open={openConfirmation}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    content="Are you sure you want to delete this client's profile?"
                />
            </>
        )
    }

    return (
        <Container style={{ margin: 20 }}>
            <Button color="orange" icon='home' onClick={() => history('/')} />
            <Header as="h1">Edit Client's Profile{props.clientId}</Header>
            {ClientInfo()}
            <AddressesTable client={client} updateAddressTable={() => getClient()}></AddressesTable>
        </Container>
    );
}

export default ClientSummary;