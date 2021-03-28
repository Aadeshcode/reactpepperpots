import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className='container-fluid'>
      <div className=" Footer row border-top justify-content-around align-items-center">
        <div className='col-12 col-md-4 '>
          <div className="list-group-items">
            <ul className="d-flex flex-column text-center p-0">
              <li className=''>About Us</li>
              <NavLink to='/frequently-asked-questions'><li className=''>FAQ</li></NavLink>
              <NavLink to='/'><li className=''>Shipping Info</li></NavLink>
              <NavLink to='/'><li className=''>Corporate Giftings</li></NavLink>
              <NavLink to='/locations'><li className=''>Locations</li></NavLink>
              <NavLink to='/terms-and-conditions'><li className=''>Terms and Conditions</li></NavLink>
            </ul>
          </div>
        </div>
        <div className=' col-12 col-md-4  d-flex flex-column align-items-center'>
          <h2>Get the dirt.</h2>
          <p className='text-center'>Follow Us on Social Media to get regular updates</p>
          <div>
            <i style={{ fontSize: "2rem" }} className="fab fa-facebook-f p-2"></i>
            <i style={{ fontSize: "2rem" }} className="fab fa-instagram p-2"></i>
            <i className="fab fa-whatsapp p-2" style={{ fontSize: "2rem" }}></i>
            <i className="fab fa-linkedin-in p-2" style={{ fontSize: "2rem" }}></i>
            <i className="fab fa-pinterest" style={{ fontSize: "2rem" }}></i>
          </div>


        </div>
        <div className=" col-12 col-md-4  list-group-items">
          <ul className="d-flex flex-column text-center p-0">
            <NavLink to='/membership'><li className=''>Memberships</li></NavLink>
            <li className=''>Subscriptions</li>
            <li className=''>Careers</li>
            <li className=''>Contact Us</li>
            <li className=''>Accessibility</li>
            <NavLink to='/privacy-policy'><li className=''>Privacy Policy</li></NavLink>
          </ul>
        </div>
      </div>
      <div >
        <p className='text-center' style={{ fontSize: "0.7rem" }}>
          Terms of use , Disclamer, Subscribe
        </p>
        <footer className='text-center' style={{ fontSize: "0.7rem" }} >&copy; Copyright 2020 Hope Plants. All Rights Reserved</footer>
      </div>
    </div>
  );
};

export default Footer;
