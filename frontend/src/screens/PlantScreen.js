import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOneProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import ProductDescription from "../components/ProductDescription";
import ProductYouMightLikeComponent from "../components/ProductYouMightLikeComponent";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactImageMagnify from 'react-image-magnify';
import ReviewComponent from "../components/ReviewComponent";
import ProductReviewStarsComponent from "../components/ProductReviewStarsComponent";
import PotsYouMightLikeComponent from "../components/PotsYouMightLikeComponent";
import cogoToast from 'cogo-toast'
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  PinterestShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  FacebookMessengerIcon,
  PinterestIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import Cart from "./Cart";
const PlantScreen = ({ match, location }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.onlyOneProduct);
  const { images, loading, price, availablePots, rating, numReviews, reviews, name, description } = data
  const [showImage, setShowImage] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [sideCartOpen, setSideCartOpen] = useState('')


  const variant = location.search ? location.search.split("=")[1] : ""
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {

    window.scrollTo(0, 0)
    dispatch(listOneProduct(match.params.id));
    setPhotoIndex(0)


  }, [dispatch, match.params.id]); //eslint-disable-line
  useEffect(() => {
    if (images && images[variant]) {
      setShowImage(images[variant][0])
    } else {
      setShowImage('/sample.jpg')
    }
  }, [images, variant])
  useEffect(() => {
    if (successProductReview) {
      cogoToast.success('Product Reviewed Sucessfully')
    }
    if (errorProductReview) {
      cogoToast.error(errorProductReview)
    }
  }, [successProductReview, errorProductReview])

  return (
    <div className="containerCustom">
      <div className={`sideCart ${sideCartOpen}`}>
        <Cart store={true} />
      </div>
      {isOpen && (
        <Lightbox
          className='lightBox'
          mainSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[variant][photoIndex]}`}
          mainSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[variant][photoIndex]}`}
          nextSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[variant][(photoIndex + 1) % images[variant].length]}`}
          nextSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[variant][(photoIndex + 1) % images[variant].length]}`}
          prevSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[(photoIndex + images[variant].length - 1) % images[variant].length]}`}
          prevSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[variant][(photoIndex + images[variant].length - 1) % images[variant].length]}`}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            photoIndex <= 0 ? setPhotoIndex(images[variant].length - 1) : setPhotoIndex(photoIndex - 1)
          }

          onMoveNextRequest={() =>
            photoIndex >= images[variant].length - 1 ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)
          }
        />
      )}
      <div className="row justify-content-center ">
        {loading ? <Loader /> : <>
          <div className="col-12 col-md-6 ">
            <div className='d-flex justify-content-center'>
              {data ? <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: `https://hopeplants.s3.ap-south-1.amazonaws.com/${showImage}`,
                },
                largeImage: {
                  src: `https://hopeplants.s3.ap-south-1.amazonaws.com/${showImage}`,
                  width: 1200,
                  height: 1800
                }
              }} className='react-image-magnify' /> : ""}
            </div>
            <div className="row mt-1 justify-content-center">

              {images && images[variant] ? images[variant].map((item) => (
                <div className='col-2 p-0 mr-1' style={{ cursor: 'pointer' }} key={item}>
                  <img
                    src={`https://hopeplants.s3.ap-south-1.amazonaws.com/${item}`}
                    alt={item}
                    className='img-fluid'
                    onClick={e => setShowImage(`${item}`)}
                    style={showImage === `${item}` ? { border: '2px solid orange' } : { border: 'none' }}
                  />
                </div>
              )) : ""}
              <div className='col-2 p-0 mr-1 d-flex align-items-center justify-content-center border ' style={{ cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
                <div onClick={() => setIsOpen(true)} className='d-flex align-items-center justify-content-center'>
                  <p>See All</p>
                </div>
              </div>
            </div>
            <p className='text-center mt-2'>
              Share
                        </p>
            <div className='d-flex justify-content-center p-2'>
              <FacebookShareButton children={<FacebookIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                quote={name}
                hashtag='plantsforlife'
                className='p-2'
              />
              <FacebookMessengerShareButton children={<FacebookMessengerIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                appId="188355769566229"
                className='p-2'
              />
              <PinterestShareButton
                children={<PinterestIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                media={`https://hopeplants.s3.ap-south-1.amazonaws.com/${showImage}`}
                description={description}
                className='p-2'
              />
              <TwitterShareButton
                children={<TwitterIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                title={name}
                className='p-2'
              />
              <ViberShareButton
                children={<ViberIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                title={name}
                className='p-2'

              />
              <WhatsappShareButton
                children={<WhatsappIcon size={32} />}
                url='https://www.makalubooks.com/product/5fc7b71af8792b06184a58c8'
                title={name}
                className='p-2'
              />
            </div>

          </div>

          <div className="col-12 col-md-5">
            <ProductDescription plant={data} price={price} loading={loading} availablePots={availablePots} variant={variant}
              plantId={match.params.id} setSideCartOpen={setSideCartOpen}
            />
          </div>

        </>}




      </div>
      {loading ? "" :

        <div className='border-top mt-5 p-md-3'>
          <ProductReviewStarsComponent rating={rating} numReviews={numReviews} reviews={reviews} />
          <ReviewComponent product={data} loadingProductReview={loadingProductReview} successProductReview={successProductReview}
            errorProductReview={errorProductReview} type="plant" />
        </div>}
      <div className='mt-2 mt-md-5'>
        {loading ? "" : <ProductYouMightLikeComponent />}
      </div>
      <div className='mt-2 mt-md-5'>
        {loading ? "" : <PotsYouMightLikeComponent />}
      </div>

    </div>
  );
};

export default PlantScreen;
