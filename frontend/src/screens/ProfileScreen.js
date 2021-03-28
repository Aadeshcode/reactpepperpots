import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebase'
import Loader from '../components/Loader';
import cogoToast from 'cogo-toast';
import { listMyOrders } from '../actions/orderActions';
import { NavLink } from 'react-router-dom';
import { userMembershipCheck } from '../actions/userActions';
const ProfileScreen = () => {
    const dispatch = useDispatch()

    const { isMember, membershipDate } = useSelector(state => state.userMembershipCheck)
    const { token } = useSelector(state => state.userToken)
    const { order, loading, error } = useSelector(state => state.myOrders)

    const savedDetails = localStorage.getItem('ppshippingAddress')
        ? JSON.parse(localStorage.getItem('ppshippingAddress'))
        : "aadesh"
    useEffect(() => {
        dispatch(listMyOrders())
        dispatch(userMembershipCheck())
    }, [dispatch])
    if (error) {
        cogoToast.error(error)
    }

    const sendEmailVerification = async () => {
        try {
            const user = auth.currentUser
            await user.sendEmailVerification()
            cogoToast.success(`An email has been sent to ${token.email}. Kindly check your inbox`, { position: "bottom-right" })
        } catch (error) {
            cogoToast.error(error.message, { position: "bottom-right" })
        }
    }
    return (
        <div className='container'>
            {loading ? <Loader /> : <>
                <h1 className='m-0 m-sm-3 text-center fontBig' >My Account</h1>
                <h2 className='text-center text-md-left'>User Information</h2>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <div className='d-flex align-items-center mb-0 mb-md-2 p-1'>
                            <p>Email</p> : <p className='ml-2'> {token.email}</p>
                        </div>

                        <h2>Saved Phone Number</h2>
                        <div className='d-flex align-items-center mb-0 mb-md-2'>
                            <p>Phone Number</p> : <p className='m-2'>{savedDetails.phone}</p>
                        </div>

                        <h2>Saved Shipping Address</h2>
                        <div className='d-flex align-items-center mb-0 mb-md-2 p-1'>
                            <p>Address</p> : <p className='m-2'>{savedDetails.address}</p>

                        </div>
                        <div className='d-flex align-items-center mb-0 mb-md-2 p-1'>
                            <p>Province No.</p> : <p className='m-2'>{savedDetails.city}</p>
                        </div>
                        <div className='d-flex align-items-center mb-0 mb-md-2 p-1'>
                            <p >Country</p> : <p className="m-2">Nepal</p>
                        </div>
                        <div className='d-flex align-items-center mb-0 mb-md-2 p-1'>
                            <p>Postal Code</p> : <p className="m-2">{savedDetails.postalCode}</p>

                        </div>

                    </div>
                    <div className='col-12 col-md-8 mt-2 mt-md-0'>
                        <h2>Email Verification</h2>
                        <div className='d-flex align-items-center'>
                            {!token.emailVerified ? <div>
                                <p className='mr-0 mr-md-3 text-danger mb-2 '>Not Verified <i className='fas fa-times' style={{ color: 'red' }}></i></p>
                                <button className='btn btn-Greenery p-3 mb-2' onClick={sendEmailVerification}>Verify Your Email Now</button>
                            </div> : <h5 className='text-success mb-2'>Verified <i className="fas fa-check-circle" style={{ color: 'green' }}></i></h5>}
                        </div>
                        <h2>MemberShip Status</h2>
                        <div className='d-flex align-items-center'>
                            {!isMember ? <div>
                                <p className='mr-0 mr-md-3 text-danger mb-2 '>Not a Member <i className='fas fa-times' style={{ color: 'red' }}></i></p>
                                <NavLink to='/membership'><button className='btn btn-Greenery p-3 mb-2'>Become a Member</button></NavLink>
                            </div> :
                                <div className='d-flex flex-column'>
                                    <h5 className='text-success mb-2'>Member <i className="fas fa-check-circle" style={{ color: 'green' }}></i></h5>
                                    <p>{`Membership Date : ${membershipDate}`}</p>
                                </div>}
                        </div>

                        <h2>Order History</h2>
                        <div className="">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"><p className="fontPBold">#</p></th>
                                        <th scope="col"><p className="fontPBold">Order Id</p></th>
                                        <th scope="col"><p className="fontPBold">Price</p></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {order.map((item, index) => (

                                        <tr key={item._id}>
                                            <th scope="row"><p className="fontPBold">{index + 1}</p></th>
                                            <td><p className="fontPBold">{item._id}</p></td>
                                            <td><p className="fontPBold">Rs.{item.totalPrice}</p></td>
                                            <td><NavLink to={`/order/${item._id}`}><button className='btn btn-secondary'><p className="fontPBold">See Details</p></button></NavLink></td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>}
        </div >
    )
}

export default ProfileScreen
