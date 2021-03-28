import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import PotsEditComponent from '../components/PotsEditComponent'
import { listColors } from "../actions/colorActions";
const AdminPotEditScreen = ({ match }) => {

    let loading = false

    const dispatch = useDispatch()
    const isEdit = match.params.id
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(listColors())
    }, [dispatch])



    return (
        <div className='container'>
            <div className='row justify-content-center fontXBig'>

            </div>
            <Link to="/admin/pots" className="btn btn-Greenery p-3 my-3">
                Go Back
            </Link>
            <div>
            <a href="/admin/createpot"><button className='btn p-3 mb-2 btn-Greenery' >Create Another Product</button></a>
            </div>
            {loading ? <Loader /> :
                <div>
                    <FormContainer>
                        <Form>
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
                            <div className='mb-5'>
                                <PotsEditComponent size="Small"  sizeVariant="Small Variant" isEdit={isEdit} setName={setName} name={name} description={description} />
                            </div>
                            <div className='mb-5'>
                                <PotsEditComponent size="Medium"  sizeVariant="Medium Variant" isEdit={isEdit} setName={setName} name={name} description={description} />
                            </div>
                            <div className='mb-5'>
                                <PotsEditComponent size="Large"   sizeVariant="Large Variant" isEdit={isEdit} setName={setName} name={name} description={description} />
                            </div>
                        </Form>
                    </FormContainer>
                </div>
            }
        </div>
    )
}

export default AdminPotEditScreen

