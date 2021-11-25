import React from 'react';
import { useState } from 'react/cjs/react.development';
import { Button, Confirm, Divider, Header, Icon, Table } from 'semantic-ui-react'
import AddNewAddress from './Modal';

const AddressesTable = (props) => {
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [addressId, setAddressId] = useState("0");

    function handleOnClickAddress(e) {
        console.log("test");
        setAddressId(e.target.parentElement.firstChild.offsetParent.parentElement.id);
        const invoker = e.target.className;

        if (invoker.includes("negative") || invoker.includes("remove")) {
            setOpenConfirmation(true);
        }
    }

    function handleDeleteCancel() {
        setOpenConfirmation(false);
    }

    function deleteAddress() {
        fetch(`https://localhost/api/clients/address/${addressId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.info("address deleted");
                    props.updateAddressTable();
                }
                throw response;
            })
            .catch(error => {
                console.error(error);
            })
        setOpenConfirmation(false);
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
                    updateAddressTable={props.updateAddressTable}
                    isUpdate={false}
                    handleOnClickAddress={(e) => handleOnClickAddress(e)}
                />
            </div>
            <Table celled>
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
                                <Table.Row id={element.id} key={element.id}>
                                    <Table.Cell>{element.id}</Table.Cell>
                                    <Table.Cell>{element.type}</Table.Cell>
                                    <Table.Cell>{element.streetName}</Table.Cell>
                                    <Table.Cell >{element.number}</Table.Cell>
                                    <Table.Cell>{element.city}</Table.Cell>
                                    <Table.Cell>{element.country}</Table.Cell>
                                    <Table.Cell >{element.comments}</Table.Cell>
                                    <Table.Cell >
                                        <Button icon="remove" negative circular onClick={(e) => handleOnClickAddress(e)} />
                                        <AddNewAddress
                                            clientId={props.client.clientId}
                                            updateAddressTable={props.updateAddressTable}
                                            addressToUpdate={props.client.addresses.find(element => element.id.toString() === addressId)}
                                            handleOnClickAddress={(e) => handleOnClickAddress(e)}
                                            isUpdate={true}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            <Confirm
                open={openConfirmation}
                onCancel={handleDeleteCancel}
                onConfirm={deleteAddress}
                content="Are you sure you want to delete this client's address?"
            />
        </>
    )
}

export default AddressesTable;