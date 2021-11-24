import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const ClientForm = (props) => {

    const [client, saveClient] = useState({ companyId: 0, id: "", name: "", lastName: "" });


    function handleChange(e, { name, value }) {
        saveClient({ ...client, [name]: value });
    }

    function handleSubmit() {

        fetch("https://localhost/api/clients", {
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
              },
        })
            .then(response => {
                if (response.ok) {
                    props.closeModal(true);
                }
                throw response;
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                //TODO: add error message
                console.error(error);
            })
    }

    return (
        <div style={{ padding: 20 }}>
            <Form onSubmit={() => handleSubmit()}>
                <Form.Group>
                    <Form.Input name="companyId" fluid label="Company's Id" width={4} onChange={handleChange} />
                    <Form.Input name="id" fluid label='Identification' placeholder='A secondary way to identify a client' width={6} onChange={handleChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input name="name" fluid label="Name" onChange={handleChange} />
                    <Form.Input name="lastName" fluid label='LastName' onChange={handleChange} />
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
    );
}

export default ClientForm