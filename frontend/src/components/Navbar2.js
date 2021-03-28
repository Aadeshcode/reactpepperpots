import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar2 = ({ cc, scc }) => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  return (
    <div className="Navbar2">
      <div className="p-3 container ">
        <div className="row justify-content-around">
          <div className="col-3 ml-0 px-0 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <NavLink to="/cart" exact><li className='p-0'>
                {" "}
                <i className="fas fa-shopping-cart"></i>{`Cart(${cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0})`}
              </li></NavLink>
            </div>
          </div>
          <div className=" col-7 text-center d-flex align-items-center justify-content-center px-0">
            <NavLink to='/'>
              <h1 className='text-center m-0'>Pepper Pots</h1>
            </NavLink>
          </div>
          <div
            className={`container ${cc} col-2 px-0 mt-1  `}
            onClick={() => (cc === "" ? scc("Hamburger") : scc(""))}
          >
            <div className="bar1 mx-auto"></div>
            <div className="bar2 mx-auto"></div>
            <div className="bar3 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
