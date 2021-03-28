import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ data }) => {
  const [counter, setCounter] = useState(0)
  const clickLeft = () => {
    const length = data.displayImages.length
    if (counter === 0) {
      setCounter(length - 1)
    } else {
      setCounter(counter - 1)
    }
  }
  const clickRight = () => {
    const length = data.displayImages.length
    if (counter === length - 1) {
      setCounter(0)
    } else {
      setCounter(counter + 1)
    }
  }
  return (


    <div>
      <div className=" rounded border-0 mx-auto flush arrowRelative position-relative mb-2">
        {data.tags && data.tags.length > 0 ?
          <div className='productCardTags d-flex align-items-center p-2'>
            <i class="far fa-star d-none d-md-block" ></i>
            <p className='fontPBold ml-1'>{data.tags[0]}</p>
          </div> : ""}
        <div className='arrowsLeft arrows ' onClick={clickLeft}>

          <i class="fas fa-angle-left p-3 d-none d-sm-block" ></i>

        </div>
        <div className='arrowsRight arrows' onClick={clickRight}>

          <i class="fas fa-angle-right p-3 d-none d-sm-block" ></i>

        </div>
        
        <NavLink exact to={`/product/plant/${data._id}?pot=${data.defaultLink}`}>
          <img
            className=" border-0 img-fluid"
            src={data.displayImages ? `https://hopeplants.s3.ap-south-1.amazonaws.com/${data.displayImages[counter]}` : ""} alt="Card cap"
          />
        </NavLink>
      </div>
      <div>
        <div className='row align-items-start justify-content-between'>
          <div className='col-12 col-sm-9'>
            <p className='productName '>{data.name}</p>
          </div>
          <div className='col-12 col-sm-3'>
            <div className='d-flex justify-content-start justify-content-sm-end'>
              {data.discount ? <p className='productDesc mr-3'><s> Rs.{data.price - 100}</s></p> : <div></div>}
              <p className='mr-1 productDesc'> Rs.{data.price}</p>
            </div>

          </div>
        </div>
        {/* <p className=' text-dark'><i>see description</i></p> */}
      </div>



    </div>
  );
};

export default ProductCard;
