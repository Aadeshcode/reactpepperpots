import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRest, resetUpdateRest } from '../actions/restActions'
import Loader from '../components/Loader'
import { NavLink } from 'react-router-dom'
import Message from '../components/Message'
const AdminRestListScreen = () => {
    const dispatch = useDispatch()
    const { loading, error, rest } = useSelector(state => state.listRest)
    useEffect(() => {
        dispatch(getAllRest())
        dispatch(resetUpdateRest())
    }, [dispatch])
    return loading ? <Loader /> : error ? <Message variant='error' message={error} /> : (
        <div className="container">

            <div className='row justify-content-center'>
                <div className='col-5'>
                    {Object.keys(rest).map((x, index) => (
                        <div>
                            <NavLink to={`/admin/rest/create/${x}`}>
                                <button className='btn btn-Greenery btn-block my-2' hidden={x === "_id" || x === "__v" ? true : false}>{x}</button>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AdminRestListScreen
