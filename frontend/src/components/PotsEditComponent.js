import React, { useEffect, useState } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";

import { createPots, listOnePot, updatePot } from "../actions/potsActions";


const PotsEditComponent = ({ isEdit, size, sizeVariant, name, description, reset, setName, setDescription }) => {


    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [selectedColors, setSelectedColors] = useState([])
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [tag, setTag] = useState([])
    const [tags, setTags] = useState([])
    const [imagesUploading, setImagesUploading] = useState(false)
    const dispatch = useDispatch();
    //get Colors to map in to pots
    const { colors } = useSelector(state => state.colorsList)
    const { success } = useSelector(state => state.createdPot)
    const pot = useSelector(state => state.onlyOnePot)
    useEffect(() => {
        dispatch(listOnePot(isEdit))
    }, [dispatch, isEdit])
    useEffect(() => {
        if (reset) {
            setPrice("")
            setImage("")
            setCountInStock("")
            setSelectedColors("")
            setImages("")
            setDimensions("")
        }
        if (pot) {
            if (isEdit) {
                setName(pot.name)
                setDescription(pot.description)
                setPrice(pot.price)
                setImage(pot.image)
                setCountInStock(pot.countInStock)
                setSelectedColors(pot.colors.map((x) => x._id))
                setImages(pot.images)
                setDimensions(pot.dimensions)
                setTags(pot.tags)
            }


        }
    }, [reset, pot]) //eslint-disable-line

    const createOrUpdateHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            dispatch(
                updatePot({
                    _id: isEdit,
                    name,
                    size: pot.size,
                    price,
                    image,
                    images,
                    dimensions,
                    description,
                    countInStock,
                    colors: selectedColors,
                    tags

                })
            );
        } else {
            dispatch(createPots({
                name,
                size,
                price,
                image,
                images,
                dimensions,
                description,
                countInStock,
                colors: selectedColors,
                tags

            }))
        }
    };

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

    const uploadFilesHandler = async (e) => {
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

            setImages(data);
            setImagesUploading(false);
        } catch (error) {
            console.error(error);
            setImagesUploading(false);
        }
    };

    const addItemsToColorsArray = (e, setter, state) => {
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
    return (
        success.find((x) => x === size) ? <h1 className='text-center'>{`${size}`} Variant has been Created</h1> : <>
            <h1>{sizeVariant}</h1>
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
                <Form.Label>Images</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
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

            <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Dimensions"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                ></Form.Control>
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

            <div>


                <p class="fontPBold p-3">
                    Choose Colors
          </p>

                <div class="my-3">
                    <div class="card card-body">

                        {colors ? colors.map((item) =>
                            <div className='d-flex align-items-center'>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value={item._id} id={`${item.color}-${size}`}
                                        onChange={(e) => addItemsToColorsArray(e, setSelectedColors, selectedColors)}
                                        checked={selectedColors.find((x) => x === `${item._id}`)}
                                    />
                                    <label class="form-check-label" for={`${item.color}-${size}`}>
                                        {item.color}                            </label>
                                </div>
                                <div className='circleSmall ml-3' style={{ backgroundColor: `${item.colorCode}` }}>

                                </div>
                            </div>
                        ) : ""}


                    </div>
                </div>

            </div>





            <Button type="submit" className="btn btn-Greenery p-3" onClick={createOrUpdateHandler} disabled={uploading && imagesUploading ? true : false}>
                {isEdit ? "Update" : "Create"}
            </Button>



        </>

    )
}

export default PotsEditComponent
