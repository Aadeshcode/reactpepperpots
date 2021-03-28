import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { colorDelete, listColors } from '../actions/colorActions'
import SmallLoader from '../components/SmallLoader'

const AdminColorListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { colors, loading } = useSelector(state => state.colorsList)
    const { deleted } = useSelector(state => state.deletedColor)

    useEffect(() => {
        dispatch(listColors())
    }, [dispatch, deleted])

    const deleteHandler = (id) => {
        dispatch(colorDelete(id))
    }

    return loading ? <div className='d-flex justify-content-center p-5'>  <SmallLoader /></div> : (
        <div className='container'>
            <NavLink to='/admin/createcolor'><button className='btn btn-Greenery p-3'>Create a color</button></NavLink>
            <div className='row'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"><p className='fontPBold'>Color Id</p></th>
                            <th scope="col"><p className='fontPBold'>Name</p></th>
                            <th scope="col"><p className='fontPBold'>ColorCode</p></th>
                            <th scope="col"><p className='fontPBold'>Color Sample</p></th>
                            <th scope="col"><p className='fontPBold'>Actions</p></th>
                        </tr>
                    </thead>
                    <tbody>

                        {colors.map((x) =>
                            <tr key={x._id}>
                                <td><p>{x._id}</p></td>
                                <td><p>{x.color}</p></td>
                                <td><p>{x.colorCode}</p></td>
                                <td><p className='circle' style={{ backgroundColor: `${x.colorCode}` }} > </p></td>
                                <td>
                                    <span
                                        onClick={() => {

                                        }}
                                    >
                                    <NavLink to={`/admin/${x._id}/editcolor`}>
                                        <i
                                            className="fas fa-edit"
                                            style={{ color: "green", cursor: "pointer" }}
                                        ></i>
                                        </NavLink>
                                    </span>
                                    <i
                                        className="far fa-trash-alt ml-1"
                                        style={{ color: "red", cursor: "pointer" }}
                                        onClick={() => deleteHandler(x._id)}
                                    ></i>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminColorListScreen
