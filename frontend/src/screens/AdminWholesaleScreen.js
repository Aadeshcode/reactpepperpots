import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWholesale } from '../actions/wholesaleActions'
import Loader from '../components/Loader'

const AdminWholesaleScreen = () => {
    const dispatch = useDispatch()
    const { loading, requests } = useSelector(state => state.getWholesale)
    useEffect(() => {
        dispatch(getWholesale())
    }, [dispatch])
    return loading ? <Loader /> : (
        <div>
            <div className='container'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Request Id</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Organisation</th>
                            <th scope="col">Message</th>

                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((x) =>
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td>{x.phone}</td>
                                <td>{x.organisation}</td>
                                <td>{x.message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AdminWholesaleScreen
