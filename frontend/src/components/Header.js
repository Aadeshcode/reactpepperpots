import React from "react";
import { NavLink } from "react-router-dom";
const Header = ({ NS }) => {


  return (
    <>
      <div className='text-center bg-Greenery'>
        <p>Stay safe from COVID-19. Read our Safety Protocols</p>
      </div>
      <div className={`HomeBody ${NS}`} >
        <div className="container-fluid w-100 ">
          <div className="row px-sm-5 px-md-0 px-3 justify-content-center borderHeader">
            <div className="p-3 d-md-flex align-items-center d-none">
           <NavLink to='/'>
              <h1>Pepper Pots</h1>
           </NavLink>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
