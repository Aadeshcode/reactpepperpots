import React, { useState, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createColors, updateColor, listOneColor } from '../actions/colorActions';
import FormContainer from "../components/FormContainer";

const AdminColorCreateScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const [color, setColor] = useState("")
    const [colorCode, setColorCode] = useState("")

    const { success } = useSelector(state => state.createdColor)
    const { success:updateSuccess } = useSelector(state => state.updatedColor)
    const colorData = useSelector(state => state.onlyOneColor)
    const isEdit = match.params.id

    const submitHandler = (e) => {
        e.preventDefault()

        if (!isEdit) {
            dispatch(createColors({
                color,
                colorCode
            }))
        } else {
            dispatch(updateColor({
                _id: isEdit,
                color,
                colorCode
            }))
        }
    }
    useEffect(() => {

        if (isEdit) {
            dispatch(listOneColor(match.params.id))
        }
    }, [dispatch, isEdit, match])

    useEffect(() => {
        if (colorData) {
            setColor(colorData.color)
            setColorCode(colorData.colorCode)
        }
        if (success || updateSuccess) {
            history.push('/admin/colors')
        }
    }, [success, history, dispatch, colorData , updateSuccess])
    return (
        <FormContainer>
            <h1>{isEdit ? "Edit Color" : "Create Color"}</h1>
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group controlId="name">
                    <Form.Label>Color Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Color Name"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-10'>
                        <Form.Group controlId="price">
                            <Form.Label>Color Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Hex code. For egs: #13aeco "
                                value={colorCode}
                                onChange={(e) => setColorCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </div>
                    <div className='col-2'>
                        <div className='circle' style={{ backgroundColor: `${colorCode}` }} >

                        </div>
                    </div>
                </div>
                <button className="btn btn-Greenery p-3" type='submit'>{isEdit ? "Update" : "Create"}</button>
            </Form>
        </FormContainer>
    )
}

export default AdminColorCreateScreen
