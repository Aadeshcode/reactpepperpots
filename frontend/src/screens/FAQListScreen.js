import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFaqs } from '../actions/faqActions'
import Message from '../components/Message';
import SmallLoader from '../components/SmallLoader';
import axios from 'axios'
import cogoToast from 'cogo-toast';
import { NavLink } from 'react-router-dom';
const FAQListScreen = ({ history }) => {
    let deleted;
    const deleteHandler = async (id) => {
        deleted = await axios.delete(`/api/faq/${id}`)
        cogoToast.success("Deleted Sucessfully")
        dispatch(getFaqs())
    }
    const { loading, error, faq } = useSelector(state => state.listFaq)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFaqs())
    }, [dispatch, deleted])






    return loading ? <div className='d-flex justify-content-center p-5'>  <SmallLoader /></div> : error ?
        <Message variant='danger' message={error} /> :
        <div className="container">
            <div className='d-flex'>
                <NavLink to='/admin/createfaq'><button className="btn btn-Greenery m-3 p-3">
                    Add New FAQ
          </button></NavLink>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"><p>FAQ Id</p></th>
                        <th scope="col"><p>Heading</p></th>
                        <th scope="col"><p>Category</p></th>
                        <th scope="col"><p>Actions</p></th>
                    </tr>
                </thead>
                <tbody>
                    {faq ? faq.map((x) => <tr>
                        <td ><p>{x._id}</p></td>
                        <td ><p>{x.question}</p></td>
                        <td><p className='d-block text-truncate'>{x.category}</p></td>
                        <td>
                            <span
                                onClick={() => {
                                    history.push(`/admin/${x._id}/editfaq`);
                                }}
                            >
                                <i
                                    className="fas fa-edit"
                                    style={{ color: "green", cursor: "pointer" }}
                                ></i>
                            </span>
                            <i
                                className="far fa-trash-alt ml-1"
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => deleteHandler(x._id)}
                            ></i>
                        </td>
                    </tr>) : ""}
                </tbody>
            </table>
        </div>
}

export default FAQListScreen
