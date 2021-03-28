import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { orderList } from '..//actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const AdminOrderList = () => {
    const dispatch = useDispatch()

    const { order, loading, error } = useSelector(state => state.orders)
    useEffect(() => {
        dispatch(orderList())
    }, [dispatch])
    return (

        error ?
            <Message variant='danger' message={error} /> :

            <div className="container">



                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Dispatched</th>
                            <th scope="col">Paid</th>
                            <th scope="col">Delivered</th>
                            <th scope="col">Actions</th>

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
                                <td>
                                    <Loader />
                                </td>


                            </tr>
                        ) : (
                                order.map((item) => (
                                    <tr key={item._id}>
                                        <th scope="row">{item._id}</th>
                                        <td>{item.user.email}</td>
                                        <td>Rs.{item.totalPrice}</td>
                                        <td>{item.createdAt.split('T')[0]}</td>
                                        <td>
                                            {item.isDelivered ? (
                                                <p> <i class="fas fa-check-circle" style={{ color: 'green' }}></i></p>
                                            ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                        </td>
                                        <td>
                                            {item.isPaid ? (
                                                <p> <i class="fas fa-check-circle" style={{ color: 'green' }}></i></p>
                                            ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                        </td>
                                        <td>
                                            {item.isDelivered ? (
                                                <i class="fas fa-check-circle" style={{ color: 'green' }}></i>
                                            ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                        </td>
                                        <td>
                                            <Link to={`/order/${item._id}`}>
                                                <button variant='light' className='btn-sm btn btn-info'>
                                                    Details
              </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>


    )

}

export default AdminOrderList
