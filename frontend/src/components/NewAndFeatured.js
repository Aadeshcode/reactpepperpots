import React from 'react'
import { useSelector } from 'react-redux'
import one from '../components/pics/newcomp.jpg'
import ProductCard from './ProductCard'
const NewAndFeatured = () => {
    const {  products } = useSelector(state => state.topProducts)
    return (
        <div className='container-fluid'>
        <div>
                <h1 className='display-4 p-3'>New & Featured</h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-7'>
                    <img
                        className=" border-0 img-fluid"
                        src={one} alt="Card cap"
                    />
                </div>
                <div className='col-12 col-md-5 mt-3 mt-md-0'>
                    <div className='row'>

                        {products.map((x) =>
                            <div className='col-6'>
                                <ProductCard data={x} />
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewAndFeatured
