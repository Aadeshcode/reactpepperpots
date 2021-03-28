import React from "react";
import pots from "./pics/Pots.jpg";
import plants from "./pics/room.jpg";
import bestsellers from "./pics/parlor.jpg";
import bestseller from "./pics/7.jpg";
import { NavLink } from "react-router-dom";
const Featured = () => {
  return (
    <div className="Featured  p-1 mt-3">
      {/* <h1 className='display-4 p-3'>Featured</h1> */}
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center ">
        
          <div className=" col-md-4 col justify-content-center  p-1 p-md-2 childUnderline">
          <NavLink to='/store'>
            <img src={plants} className="img-fluid F-Img animate__animated animate__fadeIn" alt="Plants" />
            </NavLink>
            <div className="row align-items-center justify-content-evenly p-1">
            <NavLink to='/store'>
              <li>
                <h3>Plants </h3>
              </li>
              </NavLink>
              <i className="fas fa-angle-double-right"></i>
            </div>
          </div>
          <div className="col-md-4 col justify-content-center p-1 p-md-2 childUnderline">
          <NavLink to='/store/pots'>
            <img src={pots} className="img-fluid  animate__animated animate__fadeIn" alt="Pots" />
            </NavLink>
            <div className="row align-items-center justify-content-evenly p-1">
            <NavLink to='/store/pots'>
              <li>
                <h3>Pots</h3>
              </li>
              </NavLink>
              <i className="fas fa-angle-double-right"></i>
            </div>
          </div>

          <div className="col-md-4 col-12 justify-self-center p-1 p-md-2 childUnderline">
            <NavLink to='/store/pots/bestseller'>
              <img
                src={bestsellers}
                className="img-fluid d-md-block d-none animate__animated animate__fadeIn"
                alt="Bestsellers"
              />
              <img
                src={bestseller}
                className="img-fluid F-Img d-md-none d-block mt-1 animate__animated animate__fadeIn"
                alt="Bestsellers"
              /></NavLink>
            <div className="row align-items-center justify-content-evenly p-1">
              <li className=''>
                <h3>Best Sellers </h3>
              </li>
              <i className="fas fa-angle-double-right"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Featured;
