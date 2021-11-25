import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

const AddressForm = (props) => {
    const [address, setAddress] = useState({
        type: "", streetName: "",
        number: "", city: "", country: "", comments: ""
    });

    function handleSubmit() {
        if (props.isUpdate) {
            fetch(`https://localhost/api/clients/address/${address.id}`, {
                method: 'PUT',
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
        } else {
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
    }

    function handleChange(e, { name, value }) {
        setAddress({ ...address, [name]: value });
    }

    useEffect(() => {
        if (props.isUpdate) {
            setAddress({
                ...address, type: props.addressToUpdate.type,
                streetName: props.addressToUpdate.streetName,
                number: props.addressToUpdate.number,
                city: props.addressToUpdate.city,
                country: props.addressToUpdate.country,
                comments: props.addressToUpdate.comments,
                id: props.addressToUpdate.id
            });
        }
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
                            value={address.type}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="streetName"
                            fluid
                            label="Street Name"
                            onChange={handleChange}
                            value={address.streetName}
                        />
                        <Form.Input
                            name="number"
                            fluid
                            label='Number'
                            onChange={handleChange}
                            value={address.number}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="city"
                            fluid label="City"
                            onChange={handleChange}
                            value={address.city}
                        />
                        <Form.Input
                            name="country"
                            fluid label='Country'
                            onChange={handleChange}
                            value={address.country}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name="comments"
                            fluid
                            label="Comments"
                            onChange={handleChange}
                            value={address.comments}
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