
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import SmallLoader from './SmallLoader'

const PotsDescription = ({ data, colors, price, loading, description, dimensions, variant, size }) => {
    const dispatch = useDispatch()
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    useEffect(() => {
        if (size) {
            setSelectedSize(size)
            setSelectedColor(colors[0])
        }
    }, [size, colors])


    const updateSelectedSizeAndPrice = (x) => {

        setSelectedSize(x.name)
    }
    const addToCartHandler = () => {

        dispatch(addToCart({
            selectedPot: variant,
            selectedColor: selectedColor._id,
            qty: 1
        }))


    }
    return (

        <div className='container'>
            <div className="row flex-column p-3">
                <div>
                    <h1 className='fontBig pl-2'>{data[0].name}</h1>
                </div>
                <div className='bottom-border'>
                    {loading ? <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div> : <h1 className="fontBig pl-2">Rs.{price}</h1>}
                </div>
                <div className='row bottom-border'>
                    <div className='col-3 d-flex align-items-center justify-content-start'>
                        <p className="p-2 fontPBold">Size</p>
                    </div>
                    <div className="d-flex ">
                        <div className='col-9 d-flex align-items-center p-3'>
                            {data ? data.map((x) =>
                                <NavLink to={`?variant=${x._id}`}>
                                    <div className=' mx-2' onClick={() => updateSelectedSizeAndPrice(x)}>
                                        <li className='p-0' style={selectedSize === x.size ? { borderBottom: "1px solid #067259 " } : { borderBottom: "none" }}>
                                            {x.size}
                                        </li>
                                    </div>
                                </NavLink>
                            ) : ""}
                        </div>

                    </div>
                </div>
                <div className='my-3'>
                    <div className='row'>
                        <div className="col-3 d-flex align-items-center justify-content-start">
                            <p className="p-2 fontPBold" >Colours</p>
                        </div>
                        <div className='col-9 d-flex align-items-center'>


                            {loading ? <SmallLoader /> : colors.map((x) =>

                                <div className="mr-2 d-flex flex-column justify-content-center align-items0-center">
                                    <div className={`circle `}
                                        onClick={() => setSelectedColor(x)}
                                        style={{ cursor: "pointer", backgroundColor: `${x.colorCode}` }}
                                    >
                                    </div>
                                    <p className='text-center'
                                        onClick={() => setSelectedColor(x)}
                                        style={selectedColor.color === x.color ? { cursor: "pointer", borderBottom: "1px solid #067259" } : { cursor: "pointer" }}
                                    >{x.color}</p>
                                </div>

                            )}



                        </div>

                    </div>
                </div>
                <button className='btn btn-Greenery' onClick={addToCartHandler}  > {loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ` Rs.${price} - Add to Cart`} </button>

                <div className=" p-2">
                    <div className='row bottom-border flex-sm-row flex-column'>
                        <div className='col-12 col-sm-3 d-flex align-items-start justify-content-start'>
                            <p className='fontPBold py-0 py-sm-3 text-truncate d-block d-sm-inlin'>Description</p>
                        </div>
                        <div className='col-12 col-sm-9 d-flex align-items-center justify-content-center'>
                            <p className=' py-2 mb-2'>
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 ">
                        <h2>Pot Information:</h2>
                    </div>
                    <div className='row'>
                        <div className='col-5 d-flex align-items-start justify-content-start'>
                            <p className='fontPBold py-1'>Dimensions :</p>
                        </div>
                        <div className='col-7 d-flex align-items-center justify-content-start'>
                            <p>{dimensions}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5 d-flex align-items-start justify-content-start'>
                            <p className='fontPBold py-1'>Material :</p>
                        </div>
                        <div className='col-7 d-flex align-items-center justify-content-start'>
                            <p className=" py-1">Ceramic</p>
                        </div>
                    </div>


                </div>

            </div >


        </div>)
}

export default PotsDescription
