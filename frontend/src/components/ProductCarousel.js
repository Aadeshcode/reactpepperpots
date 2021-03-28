import React from "react";

const ProductCarousel = ({ data, showdesc }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
          <img class="card-img-top img-fluid" src={item.img} alt="Card cap" />
          {!showdesc && (
            <div class="card-body bg-white">
              <h3 class="card-title m-0 bold">{item.name}</h3>
              <p className="m-0 text-danger">{`Rs.${item.price}`}</p>
              <p class="card-text">{item.shorttext}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
