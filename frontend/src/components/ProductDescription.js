
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { listOnePot } from "../actions/potsActions";
import SmallLoader from './SmallLoader'
const ProductDescription = ({ plant, price, availablePots, variant, plantId,setSideCartOpen }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const keys = availablePots ? Object.keys(availablePots) : []
  const [open, setOpen] = useState('')
  const [imageSelect, setImageSelect] = useState('')
  const [selectedSizeVariants, setSelectedSizeVariants] = useState([])
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState({})
  const [selectedColorVariant, setSelectedColorVariant] = useState("")
  const [selectedPot, setSelectedPot] = useState("") //eslint-disable-line
  const { size, colors, name, countInStock, loading, price: potPrice } = useSelector(state => state.onlyOnePot)
  const { loading: cartLoading } = useSelector(state => state.cart)

  //get URL



  useEffect(() => {
    if (availablePots[keys[0]]) {
      setImageSelect(availablePots[keys[0]][0].image)
    }
  }, [availablePots]) //eslint-disable-line
  useEffect(() => {
    const findIds = plant.availablePotsIds.includes(variant)
    if (!findIds) {
      history.push(`?pot=${plant.availablePotsIds[0]}`)
    }
    if (variant) {
      dispatch(listOnePot(variant))
    }
  }, [dispatch, variant])//eslint-disable-line

  useEffect(() => {

    setSelectedSize(size)
    setSelectedColorVariant(colors)
    setSelectedSizeVariants(availablePots[name])
    setSelectedColor(colors[0])
  }, [size, colors, availablePots, name]) //eslint-disable-line


  const addToCartHandler = () => {

    dispatch(addToCart({
      product: plantId,
      selectedPot: variant,
      selectedColor: selectedColor,
      qty: 1
    }))
setSideCartOpen('sideCartOpen')


  }
  const selectOpen = () => {
    if (open === 'active') {
      setOpen('')
    } else {
      setOpen('active')
    }
  }

  const closeSelect = () => {
    if (open === 'active') {
      setOpen()
    }
  }
  const selectPot = (pot, image) => {
    setSelectedPot(pot)
    setImageSelect(image)
  }
  return (
    <div className='container' onClick={closeSelect}>
      <div className="row flex-column p-2">
        <div>
          <h1 className='fontBig'>{plant.name}</h1>
        </div>
        <div className='bottom-border'>
          {loading ? <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div> : <h2 className="fontSmall">Rs.{price + potPrice}</h2>}

        </div>
        <div className="d-flex  flex-column bottom-border mt-2">
          <div className='row flex-sm-row flex-column'>
            <div className="col-12 col-sm-3 d-flex align-items-center justify-content-start">
              <p className="p-2 fontPBold">Pot Style</p>
            </div>





            <div class=" col-12 col-sm-9 wrapper">
              <div class={` ${open} select_wrap`} onClick={selectOpen}>
                <ul class="default_option p-0 border-1">
                  <li>
                    <div class="option" >
                      <div class="icon" style={{ backgroundImage: `url(https://hopeplants.s3.ap-south-1.amazonaws.com${imageSelect})`, backgroundSize: 'cover' }} ></div>
                      <p>{selectedPot ? selectedPot : keys[0]}</p>
                    </div>
                  </li>
                </ul>



                <ul class="select_ul p-0">
                  {keys ? keys.map((item) =>


                    <li>
                      <NavLink to={`?pot=${availablePots[item][0]._id}`}>
                        <div class="option" onClick={() => selectPot(item, availablePots[item][0].image)}>
                          <div class="icon" style={{ background: `url(https://hopeplants.s3.ap-south-1.amazonaws.com${availablePots[item][0].image}) no-repeat 0 0`, backgroundSize: 'cover' }}></div>
                          <p>{item}</p>
                        </div>
                      </NavLink >
                    </li>





                  ) : ""}
                </ul>
              </div>

            </div>








          </div>
          <div className='mt-3'>
            <div className='row flex-sm-row flex-column'>
              <div className='col-3 d-flex align-items-center justify-content-start'>
                <p className="p-2 fontPBold">Size</p>
              </div>
              <div className='col-9 d-flex align-items-center'>
                {loading ? <SmallLoader /> :
                  selectedSizeVariants ? selectedSizeVariants.map((x, index) =>

                    <NavLink to={`?pot=${x._id}`}>
                      <div className=' mx-2'>
                        <li className='p-0'
                          style={selectedSize === x.size ? { cursor: "pointer", borderBottom: "1px solid #067259" } : { cursor: "pointer" }}
                        >{x.size}</li>
                      </div>
                    </NavLink>

                  )
                    : ""}
              </div>
            </div>
          </div>
          <div className='my-2'>
            <div className='row flex-sm-row flex-column'>
              <div className="col-3 d-flex align-items-center justify-content-start ">
                <p className="p-2 fontPBold" >Colours</p>
              </div>
              <div>
                <div className='col-12 col-sm-9 d-flex align-items-center colorSlide ' >

                  {loading ? <SmallLoader /> : selectedColorVariant ? selectedColorVariant.map((x) =>
                    <div className="mr-2 d-flex flex-column justify-content-center align-items-center borderBottomAnimator ">
                      <>
                        <div className="circle d-flex justify-content-center"

                          style={{ cursor: "pointer", backgroundColor: `${x.colorCode}` }}
                          onClick={() => setSelectedColor({ color: x.color, colorCode: x.colorCode, _id: x._id })}
                        >
                        </div>
                        <p className='text-center borderBottomAnimation'

                          style={selectedColor.color === x.color ? { cursor: "pointer", borderBottom: "1px solid #067259" } : { cursor: "pointer" }}
                        >{x.color}</p></>
                    </div>
                  ) : ""}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='my-2'>
          <button className='btn btn-block btn-Greenery'
            disabled={loading || cartLoading || countInStock < 1}
            onClick={addToCartHandler} > {loading || cartLoading ?
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true">

              </span> : countInStock < 1 ? "Out Of Stock" : ` Rs.${price + potPrice} - Add to Cart`} </button>
        </div>

        <div className=" p-2">
          <div className='row bottom-border flex-sm-row flex-column'>
            <div className='col-12 col-sm-3 d-flex align-items-start justify-content-start'>
              <p className='fontPBold py-0 py-sm-3 text-truncate d-block d-sm-inlin'>Description</p>
            </div>
            <div className='col-12 col-sm-9 d-flex align-items-center justify-content-center'>
              <p className=' py-2 mb-2'>
              <span dangerouslySetInnerHTML={{ __html: plant.description }}></span>
              </p>
            </div>
          </div>
          <div className='mt-2'>
            <p className='fontPBold'>Plant Information</p>
            <div className='row flex-column flex-md-row'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-start'>
                <p className=" py-2 mr-2 fontPBold"> Generic Name :</p>
                <p>{plant.genericName}</p>
              </div>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-start'>
                <p className=" py-2 mr-2 fontPBold"> Family :</p>
                <p>{plant.family}</p>
              </div>
            </div>

            <div className='mt-2'>
              <p className='fontPBold'>Plant Care</p>
              <div className='row'>
                <div className='col-12 d-flex align-items-start justify-content-start '>
                  <p className=" py-2 fontPBold  mr-2">Sunlight :</p>
                  <p className=" py-2 ">{plant.light}</p>
                </div>
                <div className='col-12 d-flex align-items-start justify-content-start '>
                  <p className=" py-2 fontPBold  mr-2">Water :</p>
                  <p className=" py-2 ">{plant.water}</p>
                </div>
                <div className='col-12 d-flex align-items-start justify-content-start '>
                  <p className=" py-2 fontPBold  mr-2 d-block text-truncate">Pet :</p>
                  <p className=" py-2  ">{plant.pets}</p>
                </div>
              </div>


            </div>
          </div>
        </div>


      </div>

    </div >
  );
};

export default ProductDescription;
