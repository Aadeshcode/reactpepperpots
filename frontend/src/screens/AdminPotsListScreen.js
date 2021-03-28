import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPotsListScreen, potCreateReset, potDelete } from '../actions/potsActions'
import Message from '../components/Message'
import SmallLoader from '../components/SmallLoader'


const AdminPotsListScreen = ({ history }) => {

    const { loading, error, pots } = useSelector(state => state.potsListScreen)
    const { deleted } = useSelector(state => state.deletedPot)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listPotsListScreen())
        dispatch(potCreateReset())
    }, [dispatch, deleted])

    const clickHandler = () => {
        history.push(`/admin/createpot`);
    };
    const deleteHandler = (data) => {
        dispatch(potDelete(data))
    }
    return (
        <div className="container-fluid">

            {loading ? <div className='d-flex justify-content-center'><SmallLoader /></div> : error ? <Message message={error} /> : <div>
                <div className='d-flex'>
                    <button className="btn btn-Greenery m-3 p-3" onClick={clickHandler}>
                        Add New Pot
          </button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"><p className='fontPBold'>Product Id</p></th>
                            <th scope="col"><p className='fontPBold'>Name</p></th>
                            <th scope="col"><p className='fontPBold'>Image</p></th>
                            <th scope="col"><p className='fontPBold'>Price</p></th>
                            <th scope="col"><p className='fontPBold'>Count-In-Stock</p></th>
                            <th scope="col"><p className='fontPBold'>Actions</p></th>
                        </tr>
                    </thead>

                    <tbody>
                        {pots.map((item) => (
                            <tr key={item._id}>
                                <th scope="row">{item._id}</th>
                                <td>{item.name} ({item.size})</td>

                                <td>
                                    <img
                                        src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.image}`}
                                        alt="item"
                                        className='img-fluid'
                                        style={{ height: '50px' }}
                                    />
                                </td>

                                <td>Rs.{item.price}</td>
                                <td>{item.countInStock}</td>
                                <td>
                                    <span
                                        onClick={() => {
                                            history.push(`/admin/${item._id}/editpot`);
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
                                        onClick={() => deleteHandler(item._id)}
                                    ></i>
                                </td>
                            </tr>

                        ))}


                    </tbody>


                </table>

            </div>

            }
        </div>

    )
}

export default AdminPotsListScreen
