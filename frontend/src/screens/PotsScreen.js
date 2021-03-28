import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import PotsDescription from "../components/PotsDescription";
import { listOnePot, listOnePotDetails } from '../actions/potsActions';
import Message from '../components/Message';
import ReactImageMagnify from 'react-image-magnify';
import Lightbox from 'react-image-lightbox';
import ProductReviewStarsComponent from '../components/ProductReviewStarsComponent';
import ReviewComponent from '../components/ReviewComponent';
import ProductYouMightLikeComponent from '../components/ProductYouMightLikeComponent';

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
import PotsYouMightLikeComponent from '../components/PotsYouMightLikeComponent';

const PotsScreen = ({ match, location }) => {

    const dispatch = useDispatch();
    const { pots, loading, error } = useSelector(state => state.potsDetails)
    const pot = useSelector(state => state.onlyOnePot)
    const { name, size, description, dimensions, price, colors, images, loading: potLoading,
        rating, reviews, numReviews
    } = pot
    const potReviewCreate = useSelector((state) => state.potReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = potReviewCreate
    useEffect(() => {
        dispatch(listOnePotDetails(match.params.slug))
        window.scrollTo(0, 0)
    }, [match.params.slug, dispatch]);

    const potQuery = location.search ? location.search.split('=')[1] : ""
    const [showImage, setShowImage] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    useEffect(() => {
        dispatch(listOnePot(potQuery))
    }, [dispatch, potQuery])

    useEffect(() => {
        if (images) {
            setShowImage(images[0])
        }
    }, [images])
    return loading ? <Loader /> : error ? <Message message={error} variant="danger" /> : (
        <div className="containerCustom">
            <div className="row justify-content-center">
                {isOpen && (
                    <Lightbox
                        mainSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[photoIndex]}`}
                        mainSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[photoIndex]}`}
                        nextSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[(photoIndex + 1) % images.length]}`}
                        nextSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[(photoIndex + 1) % images.length]}`}
                        prevSrc={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[(photoIndex + images.length - 1) % images.length]}`}
                        prevSrcThumbnail={`https://hopeplants.s3.ap-south-1.amazonaws.com/${images[(photoIndex + images.length - 1) % images.length]}`}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            photoIndex <= 0 ? setPhotoIndex(images.length - 1) : setPhotoIndex(photoIndex - 1)
                        }

                        onMoveNextRequest={() =>
                            photoIndex >= images.length - 1 ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)
                        }
                    />
                )}
                {loading ? <Loader /> : <>
                    <div className="col-12 col-md-6">
                        <div className='d-flex justify-content-center'>
                            {images ? <ReactImageMagnify {...{
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
                            }} /> : ""}
                        </div>

                        <div className="row mt-1 justify-content-center">

                            {images ? images.map((item) => (
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
                                rounded={true}
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
                    <div className="col-12 col-md-6 overflow-hidden">
                        <PotsDescription data={pots} colors={colors ? colors : []} loading={potLoading} price={price}
                            description={description} dimensions={dimensions}
                            variant={potQuery} size={size}
                        />
                    </div>
                </>}



            </div>
            {loading ? "" :

                <div className='border-top mt-1 p-md-3'>
                    <ProductReviewStarsComponent rating={rating} numReviews={numReviews} reviews={reviews} />
                    <ReviewComponent type="pot" product={pot} loadingProductReview={loadingProductReview} successProductReview={successProductReview} errorProductReview={errorProductReview} />
                </div>}
            <div className='mt-2 mt-md-5'>
                {loading ? "" : <ProductYouMightLikeComponent />}
            </div>
            <div className='mt-2 mt-md-5'>
        {loading ? "" : <PotsYouMightLikeComponent />}
      </div>
        </div>

    )
}

export default PotsScreen
