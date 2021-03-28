import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createFaqs, getFaqsDetails, updateFaqs } from '../actions/faqActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SmallLoader from '../components/SmallLoader';

const FAQCreateScreen = ({ match, history }) => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const { loading, error, faq } = useSelector(state => state.faqDetails)
    const { loading: faqLoading, success } = useSelector(state => state.faqUpdate)
    const { loading: faqCreateLoading, success: createSuccess, error: createError } = useSelector(state => state.createFaq)

    const isEdit = match.params ? match.params.id : null

    useEffect(() => {
        if (isEdit) {
            dispatch(getFaqsDetails(match.params.id))
        }

    }, [dispatch, match, isEdit])
    useEffect(() => {
        if (faq && isEdit) {
            setCategory(faq.category)
            setQuestion(faq.question)
            setAnswer(faq.answer)
        }
        if (success || createSuccess) {
            history.push('/admin/faq')
        }

    }, [faq, isEdit, success, history, createSuccess])
    const createOrUpdateHandler = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(updateFaqs({
                _id: match.params.id,
                category: category,
                question: question,
                answer: answer
            }))
        } else {
            dispatch(createFaqs({
                category: category,
                question: question,
                answer: answer
            }))
        }
    }
    return loading || faqLoading || faqCreateLoading ? <div className='d-flex justify-content-center p-5'>  <SmallLoader /></div> : error || createError ? <Message message={error || createError} /> : (
        <div className='container'>
            <div className='row justify-content-center fontXBig'>

            </div>
            <Link to="/admin/faq" className="btn btn-Greenery p-3 my-3">
                Go Back
            </Link>

            {loading ? <Loader /> :
                <div>
                    <FormContainer>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Question"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Answer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" className='btn-Greenery p-3' onClick={(e) => createOrUpdateHandler(e)}>
                                {isEdit ? "Update" : "Create"}
                            </Button>
                        </Form>
                    </FormContainer>
                </div>
            }
        </div>

    )
}

export default FAQCreateScreen
