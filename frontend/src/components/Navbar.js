import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { logout} from "../actions/userActions";
import Carousel from "./Carousel";
import Navbar2 from "./Navbar2";
import Avatar from 'react-avatar';

const Navbar = ({ Scrolled, cc, scc }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { token } = useSelector((state) => state.userToken);
  const { isMember } = useSelector((state) => state.userMembershipCheck);
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const location = useLocation()
  

  return (
    <div className={location.pathname === "/" ? ` NHeader ${Scrolled} HomeScreen px-md-3 ` : ` NHeader ${Scrolled}  px-md-3 `}>
      <Header />
      <div className={`NavBar`}>
        <div className="container-fluid p-3">
          <div className="row align-items-center">
            <div>
              <ul className="p-0 m-0">
                <li>
                  <Link to="/" exact="true">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <Link exact="true" to="/store">
                  <li>Plants</li>
                </Link>
                <Link to='/store/pots' exact="true"> <li>Pots</li></Link>
                <Link to='/blogs' exact="true"> <li>Blogs</li></Link>

                <Link exact="true" to='/wholesalers'><li>WholeSale</li></Link>
                {userInfo && isMember ? <Link exact="true" to='/members'><li>Membership</li></Link> : ""}
                {/* <Link exact="true" to='/contact'><li>Contact Us</li></Link> */}
                {userInfo && userInfo.isAdmin ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <div
                      className="dropdown-menu m-0 "
                      aria-labelledby="navbarDropdown"
                    >
                      <Link exact="true" to="/admin/users">
                        <p className="dropdown-item m-0 py-0 ">Users</p>
                      </Link>
                      <Link exact="true" to="/admin/products">
                        <p className="dropdown-item m-0 py-0 ">Products</p>
                      </Link>
                      <Link exact="true" to="/admin/pots">
                        <p className="dropdown-item m-0 py-0 ">Pot</p>
                      </Link>
                      <Link exact="true" to="/admin/colors">
                        <p className="dropdown-item m-0 py-0 ">color</p>
                      </Link>
                      <Link exact="true" to="/admin/faq">
                        <p className="dropdown-item m-0 py-0 ">FAQS</p>
                      </Link>
                      <Link to='/admin/orders' exact="true"><p className="dropdown-item m-0 py-0">Orders</p></Link>
                      <Link to='/admin/blog'> <p className="dropdown-item m-0 py-0">Articles</p></Link>
                      <Link exact="true" to='/admin/wholesalers'><p className="dropdown-item m-0 py-0">WholeSalers</p></Link>
                      <Link exact="true" to='/admin/coupons'><p className="dropdown-item m-0 py-0">Coupons</p></Link>
                      <Link exact="true" to='/admin/rest'><p className="dropdown-item m-0 py-0">Other</p></Link>
                    </div>
                  </li>
                ) : (
                    ""
                  )}
              </ul>
            </div>
            <div className="ml-auto">
              <ul className='m-0 p-0'>
                <NavLink to="/cart" exact><li>
                  {" "}
                  <i className="fas fa-shopping-cart"></i>{`Cart(${cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0})`}
                </li></NavLink>
                {token.email ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ><Avatar name={token.email} size="30" textSizeRatio={2} round={true} color="#00ab84" className='mr-2' />
                      {token.email.split('@')[0]}
                    </a>
                    <div
                      className="dropdown-menu m-0 "
                      aria-labelledby="navbarDropdown"
                    >
                      <Link to='/profile' exact="true">
                        <p className="dropdown-item m-0 py-0 ">Profile</p>

                      </Link>
                      <p className="dropdown-item m-0 py-0" onClick={logoutHandler}>
                        Logout
                      </p>
                    </div>
                  </li>
                ) : (
                    <>
                      <li>
                        <Link exact="true" to="/login">
                          Login
                      </Link>
                      </li>
                      <li>
                        <Link exact="true" to="/signup">
                          Sign-up
                      </Link>
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar2 cc={cc} scc={scc} />
      <div className={location.pathname === "/" ? "" : "d-none"}>
        <Carousel />
      </div>
    </div>
  );
};

export default Navbar;
