import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import AddressForm from './form';

function AddNewAddress(props) {
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
            <Modal.Header>Add a new Address to this client</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <AddressForm
                        closeModal={() => setOpen(false)}
                        clientId={props.clientId}
                        updateAddressTable={props.updateAddressTable}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default AddNewAddress;