import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import ClientForm from './Form';

function AddNew(props) {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            style={{ padding: 20 }}
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary circular icon='plus' />}
        >
            <Modal.Header>Register client's information</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <ClientForm
                        closeModal={() => setOpen(false)}
                        refreshTable={props.refreshTable}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default AddNew;