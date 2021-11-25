import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Header, Icon, Table, Container, Grid, Button, Input } from 'semantic-ui-react'

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

    useEffect(() => {
        getClient();
    }, []);

    const ClientInfo = () => {
        return (
            <>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='tag' />
                        Client's information
                    </Header>
                </Divider>

                <Grid style={{ padding: 20 }}>
                    <Grid.Row columns='1'>
                        <Grid.Column floated='left'>
                            <Input label="Company" value={client.companyId} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='2'>
                        <Grid.Column floated='left'>
                            <Input label="Internal ID" value={client.clientId} />
                        </Grid.Column>
                        <Grid.Column floated='right'>
                            <Input label="ID" value={client.id} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='2' stretched>
                        <Grid.Column width={8}>
                            <Input label="Name" value={client.name} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input label="LastName" value={client.lastName} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
                <Button primary circular icon='plus' floated='right' style={{ margin: 5}} />
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
            <Header as="h1">Edit{props.clientId}</Header>
            <Button positive circular icon='home' onClick={() => history('/home')} />
            <ClientInfo></ClientInfo>
            <ClientAddresses></ClientAddresses>
        </Container>
    );
}

export default ClientSummary;