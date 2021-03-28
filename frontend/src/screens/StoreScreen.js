
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PaginationComponent from "../components/PaginationComponent";
import ProductCard from "../components/ProductCard";

const StoreScreen = ({ match, history, location }) => {

  const [key, setKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [pageNumber, setPageNumber] = useState('')
  const [sortBy, setSortBy] = useState('')

  const dispatch = useDispatch();
  const { loading, products, error, pages, page } = useSelector((state) => state.productList);
  // const pageNumber = location.search ? location.search.split('=')[1] : 1
  // const key = match.params.key ? match.params.key : ""

  useEffect(() => {
    dispatch(listProducts(pageNumber, key, sortBy))
  }, [pageNumber, sortBy]) //eslint-disable-line
  const searchHandler = (e) => {
    e.preventDefault();
    setShowKey(true)
    dispatch(listProducts(pageNumber, key, sortBy))
  }
  const clearSearch = () => {
    setKey('')
    setShowKey("")
    dispatch(listProducts(pageNumber, '', sortBy))
  }
  return (
    <div className="container-fluid">
      <div className='row align-items-center'>
        <div className='col-12 col-md-6'>
          <h1 className='fontXBig'>Live Plants</h1>
        </div>
        <div className='col-12 col-md-4 offset-md-2'>

          <form onSubmit={searchHandler} >
            <div class="form-group d-flex ">
              <input type="text" class="form-control" id="blogTitle" placeholder="Enter a Keyword"
                onChange={(e) => setKey(e.target.value)}
                value={key}
              />
              <button className='btn btn-Greenery px-3'>Search</button>

            </div>
          </form>
        </div>
      </div>
      <div className="p-2">
        <div className="row align-items-center d-none d-md-flex">
          <div className="col-1">
            <p className="fontPBold">FILTER BY</p>
          </div>
          <div className="col-8 d-flex align-items-center justify-content-start">
            <div class="p-4 " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              <h1 className=' text-center fontBig'>Features</h1>
            </div>
            <div className="p-4" type="button" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
              <h1 className=' text-center fontBig'>Price</h1>
            </div>
            <div className="p-4" type="button" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
              <h1 className=' text-center fontBig'>Size</h1>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <btn className="fontPBold  btn btn-Greenery p-3">Apply Filters</btn>
          </div>

        </div>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            Example 1 for filter
          </div>
        </div>
        <div class="collapse" id="collapseExample2">
          <div class="card card-body">
            example 2 for price
  </div>
        </div>
        <div class="collapse" id="collapseExample3">
          <div class="card card-body">
            example 3 for size
  </div>
        </div>
      </div>
      <div className='row '>
        <div className='col-12 col-md-9'>
          {showKey && key ?

            <p>Showing search  results for <strong>{key}</strong> </p>

            : ""}</div>
        <div className='col-12 col-md-3 d-flex justify-content-end align-items-center px-3 mt-md-0 mt-2 mb-2'>
          {key && showKey ? <button className='btn btn-Greenery rounded btn-block px-2' onClick={clearSearch}>Clear Search</button>
            : ""}
          <div class="dropdown">
            <p class="btn dropdown-toggle fontPBold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort By
                        </p>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <p className='p-2 dropdown-item' onClick={() => setSortBy('views')}>Most Popular</p>
              <p className='p-2 dropdown-item' onClick={() => setSortBy('createdAt')}>Newest First</p>
              <p className='p-2 dropdown-item' onClick={() => setSortBy('price')}>Price Low to High</p>
              <p className='p-2 dropdown-item' onClick={() => setSortBy('pricehightolow')}>Price High to Low</p>
            </div>
          </div>

        </div>
      </div>

      <div className="row ">

        <div className="col p-0">
          {error ? (
            <Message variant="danger" message={error} />
          ) : loading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row justify-content-start " style={{}}>
                {products.length >= 1 ? products.map((x) =>
                  <div className="col-6 col-md-4 p-md-3 p-1  ">
                    <ProductCard data={x} />
                  </div>
                ) :
                  <div className="col-12 col-md-4 p-md-3 p-1 d-flex align-items-center">
                    <i class="fas fa-exclamation-circle px-2" style={{ color: 'red' }}></i>
                    <p className='text-center'>No products found</p>
                  </div>

                }

              </div>
            </div>
          )}
        </div>
      </div>
      {loading || error || key ? " " : <PaginationComponent pages={pages} page={page} link='/store' pageNumber={pageNumber} setPageNumber={setPageNumber} />}
    </div>
  );
};

export default StoreScreen;
