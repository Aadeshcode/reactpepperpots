import React from "react";
import { products } from "../Data/products";

const RecommendedPlants = () => {
  return (
    <div>
      <h2 className='text-center'>Plants Recommended</h2>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {products.slice(0,10).map((item, index) => (
            <li className="Recommended col-md-2 col-5 py-2 py-md-3 px-4 border  border-info row justify-content-center align-items-center m-1 cursor">
              <>
                <h5 className="m-0 text-truncate d-block">{item.name}</h5>
              </>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlants;
