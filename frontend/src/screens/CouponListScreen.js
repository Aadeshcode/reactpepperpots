import React, { useEffect } from "react";
import { couponCreateReset, deleteCoupon, getCoupons } from "../actions/couponActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { NavLink } from "react-router-dom";
const CouponListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.couponsList);
  const { loading: deleteLoading, error: deleteError, success } = useSelector((state) => state.deleteCoupon);
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);
  useEffect(() => {
    dispatch(couponCreateReset())
  }, []) //eslint-disable-line
  useEffect(() => {
    if (success) {
      dispatch(getCoupons());
    }
  }, [success]) //eslint-disable-line
  const deleteHandler = (id) => {
    dispatch(deleteCoupon(id))
  }
  return loading || deleteLoading ? <Loader /> : error ? <Message variant='error' message={error} /> : deleteError ? <Message variant='error' message={deleteError} /> : (
    <div className="container">
      <NavLink to='/admin/coupons/create'>
        <button className="btn btn-Greenery p-3">Add a new Coupon</button>
      </NavLink>
      <div className='row'>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Expiry</th>
              <th>Discount</th>
              <th>Issuer</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((x, index) => (
              <tr key={x._id}>
                <td>{index + 1}</td>
                <td>{x.code}</td>
                <td>{x.expiry}</td>
                <td>{x.discount}</td>
                <td>{x.giver}</td>
                <td>{x.description}</td>
                <td>
                  <span
                    onClick={() => {
                      history.push(`/admin/${x._id}/couponedit`);
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
                    onClick={() => deleteHandler(x.code)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default CouponListScreen;
