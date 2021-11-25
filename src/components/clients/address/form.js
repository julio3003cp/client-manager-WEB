import React, { useState } from 'react';
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

    return (
        <>
            <div style={{ padding: 20 }}>
                <Form onSubmit={() => handleSubmit()}>
                    <Form.Group>
                        <Form.Input name="type" fluid label="Type" width={4} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name="streetName" fluid label="Street Name" onChange={handleChange} />
                        <Form.Input name="number" fluid label='Number' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name="city" fluid label="City" onChange={handleChange} />
                        <Form.Input name="country" fluid label='Country' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name="comments" fluid label="Comments" onChange={handleChange} />
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