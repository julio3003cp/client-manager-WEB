import React from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react'
import AddNewAddress from './Modal';

const AddressesTable = (props) => {
    function getAddressId(e) {
        console.log(e);
    }

    return (
        <>
            <Divider horizontal style={{ padding: 10 }}>
                <Header as='h4'>
                    <Icon name='address book' />
                    Addresses
                </Header>
            </Divider>
            <div style={{ float: 'right', paddingBottom: 5 }}>
                <AddNewAddress 
                clientId={props.client.clientId} 
                updateAddressTable={props.updateAddressTable} />
            </div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Street</Table.HeaderCell>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Comments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        props.client.addresses.map(element => {
                            return (
                                <Table.Row id={element.id} key={element.id} onClick={(e) => getAddressId(e)}>
                                    <Table.Cell>{element.id}</Table.Cell>
                                    <Table.Cell>{element.type}</Table.Cell>
                                    <Table.Cell>{element.streetName}</Table.Cell>
                                    <Table.Cell >{element.number}</Table.Cell>
                                    <Table.Cell>{element.city}</Table.Cell>
                                    <Table.Cell>{element.country}</Table.Cell>
                                    <Table.Cell >{element.comments}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default AddressesTable;