import React from "react";
import { products } from "../Data/products";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";

const SomethingForEveryone = () => {
  return (
    <>
      <h1 className='text-center'>Something For Everyone</h1>

      <div className="d-none d-sm-block">
        <ProductCard data={products} width="400px" />
      </div>
      <div
        id="carouselExampleControls"
        class="carousel slide d-sm-none"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <ProductCarousel data={products} width="20px" />
        </div>

        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default SomethingForEveryone;
