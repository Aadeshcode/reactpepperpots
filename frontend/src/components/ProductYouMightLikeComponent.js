
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsSuggestions } from '../actions/productActions'
import ProductCard from './ProductCard'


const ProductYouMightLikeComponent = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.productsSuggestions)
    useEffect(() => {
        dispatch(getProductsSuggestions())
    }, [dispatch])
    return (
        <div className='container-fluid'>
            <h1>Products You Might Like</h1>
            <div className='row'>
                {products.map((x) =>
                    <div className="col-6 col-md-3 p-md-3 p-1 ">
                        <ProductCard data={x} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductYouMightLikeComponent
