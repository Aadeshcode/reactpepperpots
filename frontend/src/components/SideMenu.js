import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";
import Avatar from 'react-avatar';
const SideMenu = ({ cc, scc }) => {
  const dispatch = useDispatch()
  const [Transform, setTransform] = useState("TransformAgain");
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (cc === "Hamburger") {
      setTransform("TransformNow");
    } else {
      setTransform("TransformAgain")
    }
  }, [cc]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className={`SideMenu py-3 ${Transform}`} onClick={() => scc("")}>
      <div className="container">
        <div className="row align-items-center justify-content-evenly">
          <div>
            <div
              className={`${cc} col m-0 `}
              onClick={() => (cc === "" ? scc("Hamburger") : scc(""))}
            >
              <div className="bar1 mx-auto"></div>
              <div className="bar2 mx-auto"></div>
              <div className="bar3 mx-auto"></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-5 border-bottom ">Hope Plants</h1>
          </div>
          <div className="">
            <p className="m-0 ml-2">Cart(0)</p>
          </div>
        </div>
      </div>
      <div>
      {userInfo ? (
                  <div className="d-flex">
                    <div
                      className=" m-0 "
                      
                    >
                      <NavLink to='/profile' exact="true">
                        <p className=" m-0 py-0 px-2 "><Avatar name={userInfo.email} size="30" textSizeRatio={1.3} round={true} className='mr-2'/>{userInfo.email.split('@')[0]}</p>

                      </NavLink>
                      <p className=" m-0 py-0 px-2" onClick={logoutHandler}>
                        Logout
                      </p>
                    </div>
                  </div>
                ) : (
                    <>
                      <li>
                        <NavLink exact="true" to="/login">
                          Login
                      </NavLink>
                      </li>
                      <li>
                        <NavLink exact="true" to="/signup">
                          Sign-up
                      </NavLink>
                      </li>
                    </>
                  )}
      </div>
      <div className="container">
        <div className="row flex-column  border-bottom py-2">
          <div className='mb-3'>
            <NavLink to='/'> <h1 className="px-2 bolder">Home</h1></NavLink>
            <NavLink to='/store' exact><h1 className="px-2 bolder">Plants</h1></NavLink>

            <NavLink to='/store/pots'><h1 className="px-2 bolder">Pots</h1></NavLink>
            <NavLink to='/blogs'><h1 className="px-2 bolder">Blogs</h1></NavLink>
            <NavLink to='/wholesalers'><h1 className="px-2 bolder">Wholesale</h1></NavLink>
          </div>
          <NavLink to='/aboutus'><p className="px-2 ">About us</p></NavLink>
          <NavLink to='/contactus'><p className="px-2 ">Contact Us</p></NavLink>
          <NavLink to='/contactus'><p className="px-2 ">Locations</p></NavLink>
          <NavLink to='/faq'><p className="px-2 ">FAQ</p></NavLink>
          <NavLink to='/shippingpolicy'><p className="px-2 ">Shipping policy</p></NavLink>
          <NavLink to='/shippingpolicy'><p className="px-2 ">Best Sellers</p></NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
