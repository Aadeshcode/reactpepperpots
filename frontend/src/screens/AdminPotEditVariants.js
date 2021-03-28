import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listColors } from '../actions/colorActions';
import PotsEditComponent from '../components/PotsEditComponent';

const AdminPotEditVariants = ({match , history}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
  
    const isEdit = match.params.id
    const dispatch = useDispatch()
    const {  success } = useSelector(state => state.updatedPot)
    useEffect(() => {
        dispatch(listColors())
    }, [dispatch])
    useEffect(() => {
        if (success) {
            history.push('/admin/pots')
        }
    }, [success, history])
    return (
        <div className='container'>

            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <PotsEditComponent isEdit={isEdit} name={name} description={description} setName={setName} setDescription={setDescription} />

        </div>
    )
}

export default AdminPotEditVariants
