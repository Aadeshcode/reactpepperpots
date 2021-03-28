import React from "react";
import imageone from "./pics/6722.jpg";
const Refer = () => {
  return (
    <div className="mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-sm-6">
          <img src={imageone} alt="imageone" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-md-start flex-column">
          <h4 className="text-sm-left Jumbotron">
            Refer to your friends to get special discounts on your next order
          </h4>
          <form>
            <div className="form-group m-0">
              <input
                type="email"
                className="form-control col-md-12 mb-3"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </form>
          <button className="btn btn-success btn-sm-block btn-sm-lg px-md-5">
            Refer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refer;
