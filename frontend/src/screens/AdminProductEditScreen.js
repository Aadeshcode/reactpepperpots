import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { createProducts, listOneProduct, productCreateReset, updateProduct } from '../actions/productActions';
import Message from '../components/Message'
import cogoToast from 'cogo-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AdminProductEditScreen = ({ match, history }) => {


  const dispatch = useDispatch();

  const [pots, setPots] = useState([])
  //select updatedProduct success to redirect back to admin page
  const { success, loading: updateLoading } = useSelector(state => state.updatedProduct)
  const { success: createSuccess } = useSelector(state => state.createdProduct)

  //get pots
  const getPots = async () => {
    const { data } = await axios.get('/api/pots/all')

    setPots(data)

  }

  //check if it is edit screen or create screen
  const isEdit = match.params.id

  //if it is edit screen populate into fields
  const data = useSelector(state => state.onlyOneProduct)

  //states for forms
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState({});
  const [displayImages, setDisplayImages] = useState([])
  const [light, setLight] = useState("")
  const [water, setWater] = useState("")
  const [pets, setPets] = useState("")
  const [discount, setDiscount] = useState(0)
  const [availableSizes, setAvailableSizes] = useState([])
  const [availablePots, setAvailablePots] = useState([])
  const [family, setFamily] = useState("");
  const [genericName, setGenericName] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const [tag, setTag] = useState([])
  const [tags, setTags] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [sortByLoading, setSortByLoading] = useState(false)
  //update handler



  const createOrUpdateHandler = (e) => {

    e.preventDefault();
    if (isEdit) {
      dispatch(
        updateProduct({
          _id: match.params.id,
          name,
          price,
          image,
          images,
          displayImages,
          family,
          genericName,
          countInStock,
          description,
          uploading,
          light,
          water,
          pets,
          discount,
          availablePots,
          availableSizes,
          tags,
          sortBy

        })
      );
    } else {
      dispatch(createProducts({
        name,
        price,
        displayImages,
        image,
        images,
        light,
        water,
        pets,
        discount,
        availablePots,
        availableSizes,
        family,
        genericName,
        countInStock,
        description,
        tags,
        sortBy

      }))
    }
  };

  //image uploading for plants and pots
  const uploadFileHandler = async (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/image/upload",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  //image array uplaoding

  const uploadFilesHandler = async (e, pot) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {

      formData.append("images", files[index]);
    }

    setImagesUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/image/uploads",
        formData,
        config
      );
      if (pot) {
        setImages({ ...images, [pot]: [...data] })
      } else {
        setDisplayImages(data)
      }

      setImagesUploading(false);
    } catch (error) {
      console.error(error);
      setImagesUploading(false);
    }
  };
  //resetting created product from list screen
  useEffect(() => {
    dispatch(productCreateReset())
    getPots();
  }, [dispatch])

  //sending request for data to be populated


  //redirecting back to admin list page
  useEffect(() => {
    if (isEdit) {
      dispatch(listOneProduct(isEdit))
    }
    if (success || createSuccess) {
      history.push('/admin/products')
    }
  }, [success, isEdit, createSuccess])//eslint-disable-line

  //useEffect for edit screen
  useEffect(() => {
    if (data && isEdit) {
      setName(data.name)
      setPrice(data.price)
      setDescription(data.description)
      setImage(data.image)
      setFamily(data.family)
      setGenericName(data.genericName)
      setCountInStock(data.countInStock)
      setLight(data.light)
      setWater(data.water)
      setPets(data.pets)
      setDiscount(data.discount)
      setAvailablePots(data.availablePotsIds)
      setAvailableSizes(data.availableSizes)
      setTags(data.tags)
      setSortBy(data.sortBy)
      setDisplayImages(data.displayImages)
      setImages(data.images)


    }
  }, [data, isEdit])


  const addItemsToSizeArray = (e, setter, state) => {
    if (e.target.checked) {
      setter([...state, e.target.value])
    } else {
      setter(state.filter((x) => x !== e.target.value))
    }
  }
  const addItemsToPotsArray = (e, setter, state) => {
    if (e.target.checked) {
      setter([...state, e.target.value])
    } else {
      setter(state.filter((x) => x !== e.target.value))
    }
  }
  const addTags = (e) => {
    e.preventDefault()
    setTags([...tags, tag])
    setTag('')
  }
  const removeTags = (e, y) => {
    e.preventDefault()
    setTags(tags.filter((x) => x !== y))
  }
  let error = false
  const updateSort = async (e) => {
    e.preventDefault()
    setSortByLoading(true)
    await axios.put(`/api/products/${data.sortBy}/sort`, { sortBy })
    cogoToast.success("Updated")
    setSortByLoading(false)
  }
  return data.loading || updateLoading ? (<Loader />) : error ? <Message message={error} /> : (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
  </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              multiple
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          {/* multiple images */}
          <Form.Group controlId="image">
            <Form.Label>Display Images</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={displayImages}
              onChange={(e) => setDisplayImages(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              multiple
              onChange={uploadFilesHandler}
            ></Form.File>
            {imagesUploading && <Loader />}
          </Form.Group>
          {/* multiple images end */}



          {/* choose avaiable sizes */}
          <div className='my-3'>
            <p>

              <button class="btn btn-Greenery p-3" type="button" data-toggle="collapse" data-target="#collapseSize" aria-expanded="false" aria-controls="collapseExample">
                Choose available Sizes
              </button>
            </p>
            <div class="collapse my-3" id="collapseSize">
              <div class="card card-body">
                <div className='d-flex'>
                  {["Small", "Medium", "Large"].map((item) =>

                    <div class="form-check mx-3">
                      <input class="form-check-input" type="checkbox" value={item} id={item}
                        onChange={(e) => {
                          addItemsToSizeArray(e, setAvailableSizes, availableSizes)
                        }}
                        checked={availableSizes ? availableSizes.find((x) => x === `${item}`) : false}
                      />
                      <label class="form-check-label" for={item}>
                        {item}
                      </label>
                    </div>

                  )}
                </div>

              </div>
            </div>
          </div>

          {/* choose available pots */}
          <div>
            <p>

              <button class="btn btn-Greenery p-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Choose available pots
                  </button>
            </p>
            <div class="collapse my-3" id="collapseExample">
              <div class="card card-body">

                {pots.map((item) =>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value={item._id} id={item._id}
                      onChange={(e) => {
                        addItemsToPotsArray(e, setAvailablePots, availablePots)
                      }}
                      checked={availablePots ? availablePots.find((x) => x === `${item._id}`) : false}
                    />
                    <label class="form-check-label" for={item._id}>
                      {item.name}  {item.size}                          </label>
                    <Form.Group controlId="image" hidden={!availablePots.includes(item._id)} >
                      <Form.Label>Images</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter image url"
                        value={images ? images[item._id] : ['sample.jpg']}
                      ></Form.Control>
                      <Form.File
                        id="image-file"
                        label="Choose File"
                        custom
                        multiple
                        onChange={(e) => uploadFilesHandler(e, item._id)}
                      ></Form.File>
                      {imagesUploading && <Loader />}
                    </Form.Group>
                  </div>
                )}


              </div>
            </div>
          </div>

          <Form.Group controlId="family">
            <Form.Label>family</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}

            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="genericName">
            <Form.Label>Generic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Generic Name"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <ReactQuill

              theme='snow'
              id='body'
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e)}
            />

          </Form.Group>

          <h1>Extra Information</h1>
          <Form.Group controlId="description">
            <Form.Label>light</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter light conditions"
              value={light}
              onChange={(e) => setLight(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>water</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter water conditions"
              value={water}
              onChange={(e) => setWater(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Pets</Form.Label>
            <Form.Control
              type="text"
              placeholder="is it pet friendly?"
              value={pets}
              onChange={(e) => setPets(e.target.value)}

            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="Number"
              placeholder=""
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
            <small>Any Discounts for the product? just write number. % is not needed</small>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Tags</Form.Label>
            <div>
              {tags ? tags.map((x) => <div className='d-flex align-items-center'>
                <p class="badge badge-pill badge-danger mx-1">{x}</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={(e) => removeTags(e, x)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>) : ""}
            </div>
            <Form.Control
              type="text"
              placeholder="Enter Tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            ></Form.Control>
            <button class="input-group-text btn-Greenery btn p-3" onClick={addTags}>Add</button>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Sorting Number</Form.Label>

            <Form.Control
              type="Number"
              placeholder="Enter Index"
              disabled={sortByLoading}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            ></Form.Control>
            <div class="input-group-prepend">
              <div className='btn btn-Greenery p-3' onClick={updateSort}>Update</div>
            </div>
            <small>Products will be sorted according to this Number</small>
          </Form.Group>
          {sortByLoading ? <Loader /> : ""}

          <Button type="submit" className='btn-Greenery p-3 btn-block' onClick={(e) => createOrUpdateHandler(e)} disabled={uploading && imagesUploading ? true : false}>
            Update
            </Button>
        </Form>

      </FormContainer>
    </>

  )
}

export default AdminProductEditScreen
