import React from "react";
import Bg from "./pics/9.jpg";
import Bgs from "./pics/8.jpg";
import Bgd from "./pics/6722.jpg";
import { NavLink } from "react-router-dom";

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="container-fluid ">
        <div className="row C-Wrapper ">
          <div className="col JumboWrapper align-items-center align-items-sm-start d-flex flex-column justify-content-center ml-0 ml-md-5 text-md-left text-center mt-md-0 mt-5">
            <h1 className="display-3 Jumbotron animate__animated animate__fadeInLeft">
              Plant is the new Luxury
            </h1>
            <div className=''>
            <p className="text-center animate__animated animate__fadeInLeft animate__delay-1s">
              Decorate your home with indoor plants
            </p>
            </div>
            <div className='container-fluid p-0'>
              <NavLink to='/store'>
                <button className="btn btn-Greenery btn-md-block animate__animated animate__fadeInLeft animate__delay-2s p-3 px-5 mt-2">
                  Shop Now
            </button>
              </NavLink>
            </div>


          </div>
          <div className="col imgWrapper carousel slide " data-interval="7000" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="img-fluid animate__animated animate__fadeInRight"
                  alt="background"
                  src={Bg}
                />
              </div>
              <div className="carousel-item">
                <img
                  className="img-fluid animate__animated animate__fadeInRight"
                  alt="background"
                  src={Bgs}
                />
              </div>
              <div className="carousel-item">
                <img
                  className="img-fluid animate__animated animate__fadeInRight"
                  alt="background"
                  src={Bgd}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
