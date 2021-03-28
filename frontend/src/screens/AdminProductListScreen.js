
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  productDelete,
  productUpdateReset,
} from "../actions/productActions";
import Message from "../components/Message";
import PaginationComponent from "../components/PaginationComponent";
import SmallLoader from "../components/SmallLoader";

const AdminProductListScreen = ({ history, location }) => {
  const [pageNumber, setPageNumber] = useState('')
  // const pageNumber = location.search ? location.search.split('=')[1] : 1
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, pages, page } = productList;
  const { deleted } = useSelector((state) => state.deletedProduct);
  const { success: successUpdate } = useSelector((state) => state.updatedProduct);
  if (successUpdate) {
    dispatch(productUpdateReset())
  }
  const deleteHandler = (id) => {
    dispatch(productDelete(id));
  };

  const clickHandler = () => {
    history.push(`/admin/createproduct`);
  };

  //dispatching once the component mounts
  useEffect(() => {
    dispatch(listProducts(pageNumber))
  }, [dispatch, deleted, pageNumber]) //eslint-disable-line

  //pushing after product is created

  return error ? (
    <Message variant="danger" message={error} />
  ) : (
      <div className="container-fluid">
        {loading ? <div className='d-flex justify-content-center'><SmallLoader /></div> :
          <div>
            <div className='d-flex'>
              <button className="btn btn-Greenery m-3 p-3" onClick={clickHandler}>
                Add New Product
      </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Product Id</th>
                  <th scope="col">Name</th>

                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Count-In-Stock</th>
                  <th scope="col">Sort</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr key={item._id}>
                    <th scope="row">{item._id}</th>
                    <td>{item.name}</td>

                    <td>
                      <img
                        src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.image}`}
                        alt="item"
                        className='img-fluid'
                        style={{ height: '50px' }}
                      />
                    </td>

                    <td>Rs.{item.price}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.sortBy}</td>

                    <td>
                      <span
                        onClick={() => {
                          history.push(`/admin/${item._id}/edit`);
                        }}
                      >
                        <i
                          className="fas fa-edit"
                          style={{ color: "green", cursor: "pointer" }}
                        ></i>
                      </span>
                      <i
                        className="far fa-trash-alt ml-1"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(item._id)}
                      ></i>
                    </td>
                  </tr>

                ))}</tbody>


            </table>

          </div>

        }
        {loading ? "" : <PaginationComponent pages={pages} page={page} link='/store' pageNumber={pageNumber} setPageNumber={setPageNumber} />}
      </div>

    )
};

export default AdminProductListScreen;
