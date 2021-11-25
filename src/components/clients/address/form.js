import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

const AddressForm = (props) => {
    const [address, setAddress] = useState({});

    function handleSubmit() {
        fetch(`https://localhost/api/clients/address/${props.clientId}`, {
            method: 'POST',
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    //return response.json();
                    props.updateAddressTable();
                    props.closeModal(true);
                }
                throw response;
            })
            .then(data => {
                //setClient(data);
                setAddress(data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function handleChange(e, { name, value }) {
        setAddress({ ...address, [name]: value });
    }

    useEffect(() => {
        console.log("Got this address: " + JSON.stringify(props.addressToUpdate));
    }, []);
    return (
        <>
            <div style={{ padding: 20 }}>
                <Form onSubmit={() => handleSubmit()}>
                    <Form.Group>
                        <Form.Input
                            name="type"
                            fluid label="Type"
                            width={4}
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.type : ""}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="streetName"
                            fluid
                            label="Street Name"
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.streetName : ""}
                        />
                        <Form.Input
                            name="number"
                            fluid
                            label='Number'
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.number : ""}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="city"
                            fluid label="City"
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.city ? props.addressToUpdate.city : "" : ""}
                        />
                        <Form.Input
                            name="country"
                            fluid label='Country'
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.country ? props.addressToUpdate.country : "" : ""}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="comments"
                            fluid
                            label="Comments"
                            onChange={handleChange}
                            value={props.isUpdate ? props.addressToUpdate.comments ? props.addressToUpdate.comments : "" : ""}
                        />
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
            </div>
        </>
    )
}

export default AddressForm;