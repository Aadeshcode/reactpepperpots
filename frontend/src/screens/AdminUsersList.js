import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersList } from '../actions/userActions'
import Loader from '../components/Loader'

const AdminUsersList = () => {
    const dispatch = useDispatch()

    const { users, loading } = useSelector(state => state.allUsers)
    useEffect(() => {
        dispatch(usersList())
    }, [dispatch])
    return (
        <div className='container'>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">is Admin</th>
                        <th scope="col">Created At</th>

                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <th scope="row">
                                <Loader />
                            </th>
                            <td>
                                <Loader />
                            </td>
                            <td>
                                <Loader />
                            </td>
                            <td>
                                <Loader />
                            </td>
                            <td>
                                <Loader />
                            </td>
                            
                        </tr>
                    ) : (
                            users.map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">{item._id}</th>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td> {item.isAdmin ? (
                                        <i class="fas fa-check-circle" style={{ color: 'green' }}></i>
                                    ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                    <td>{item.createdAt.substring(0,10)}</td>
                                    

                                </tr>
                            ))
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsersList
