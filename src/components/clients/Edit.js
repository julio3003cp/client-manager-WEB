import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Header, Icon, Table, Container, Button, Form } from 'semantic-ui-react'

const ClientSummary = (props) => {
    const params = useParams();
    const history = useNavigate();
    const [client, setClient] = useState({ addresses: [] });

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

    function addAddress() {
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
    function handleSubmit() {
        fetch(`https://localhost/api/clients/${params.clientId}`, {
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

    const ClientInfo = () => {
        return (
            <>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='tag' />
                        Client's information
                    </Header>
                </Divider>
                <Form onSubmit={() => handleSubmit()}>
                    <Form.Group>
                        <Form.Input name="companyId" fluid label="Company's Id" width={4} onChange={handleChange} value={client.companyId} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input name="clientId" fluid label="Company's Id" width={4} onChange={handleChange} value={client.clientId} />
                        <Form.Input name="id" fluid label='Identification' placeholder='A secondary way to identify a client' width={6} onChange={handleChange} value={client.id} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name="name" fluid label="Name" onChange={handleChange} value={client.name} />
                        <Form.Input name="lastName" fluid label='LastName' onChange={handleChange} value={client.lastName} />
                    </Form.Group>
                    <Button
                        floated='right'
                        type='submit'
                        content="Save"
                        labelPosition='right'
                        icon='save'
                        positive
                    />
                </Form>
            </>
        )
    }

    const ClientAddresses = () => {
        return (
            <>
                <Divider horizontal style={{ padding: 20 }}>
                    <Header as='h4'>
                        <Icon name='bar chart' />
                        Addresses
                    </Header>
                </Divider>
                <Button primary circular icon='plus' floated='right' style={{ margin: 5 }} />
                {
                    client.addresses.map(address => {
                        return (
                            <Table definition key={address.id}>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell width={2}>Id</Table.Cell>
                                        <Table.Cell>{address.id}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Type</Table.Cell>
                                        <Table.Cell>{address.type}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Street</Table.Cell>
                                        <Table.Cell>{address.streetName}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Number</Table.Cell>
                                        <Table.Cell>{address.number}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>City</Table.Cell>
                                        <Table.Cell>{address.city}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Country</Table.Cell>
                                        <Table.Cell>{address.country}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Comments</Table.Cell>
                                        <Table.Cell>{address.comments}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        );
                    })
                }
            </>
        )
    }

    return (
        <Container style={{ margin: 20 }}>
            <Button positive circular icon='home' onClick={() => history('/home')} />
            <Header as="h1">Edit Client's Profile{props.clientId}</Header>
            <ClientInfo></ClientInfo>
            <ClientAddresses></ClientAddresses>
        </Container>
    );
}

export default ClientSummary;